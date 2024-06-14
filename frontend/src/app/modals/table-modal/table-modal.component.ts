import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { TableService } from 'src/app/services/table.service';
import { TirasseService } from 'src/app/services/tirasse.service';

@Component({
  selector: 'app-table-modal',
  templateUrl: './table-modal.component.html',
  styleUrls: ['./table-modal.component.scss'],
})
export class TableModalComponent implements OnInit {

  @Input() table: any;
  tableForm: FormGroup;
  tirasses: any[] = [];
  isEditMode: boolean = false;
  modalTitle: string = 'Add Table';
  buttonTitle: string = 'ADD TABLE';

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private tableService: TableService,
    private tirasseService: TirasseService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {
    this.tableForm = this.formBuilder.group({
      numero: ['', Validators.required],
      idTirasse: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getTirasses();
    if (this.table) {
      this.isEditMode = true;
      this.modalTitle = 'Edit Table';
      this.buttonTitle = 'UPDATE TABLE';
      this.preFillForm(this.table);
    }
  }

  getTirasses() {
    this.tirasseService.getAll().subscribe(tirasses => {
      this.tirasses = tirasses;
    });
  }

  preFillForm(table: any) {
    this.tableForm.patchValue({
      numero: table.numero,
      idTirasse: table.idTirasse
    });
  }

  async onAddOrUpdateTable() {
    if (this.tableForm.valid) {
      const loading = await this.loadingController.create({
        message: 'Please wait...',
        spinner: 'crescent',
        translucent: true
      });
      await loading.present();

      const formData = new FormData();
      formData.append("id",this.table.id);
      formData.append('numero', this.tableForm.get('numero')?.value);
      formData.append('idTirasse', this.tableForm.get('idTirasse')?.value);

      const serviceCall = this.isEditMode ?
        this.tableService.updateTable(this.table.id, formData) :
        this.tableService.addTable(formData);

      serviceCall.subscribe(
        async (response) => {
          await this.showAlert('Success', `Table ${this.isEditMode ? 'updated' : 'added'} successfully`);
          this.dismiss();
        },
        async (error) => {
          console.error('Error processing request', error);
          await this.showAlert('Error', `Failed to ${this.isEditMode ? 'update' : 'add'} table`);
        },
        async () => {
          await loading.dismiss();
        }
      );
    } else {
      await this.showAlert('Invalid Form', 'Please fill in all required fields.');
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
