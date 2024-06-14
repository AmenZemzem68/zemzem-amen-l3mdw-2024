import { Component, OnInit } from '@angular/core';
import { AgentService } from 'src/app/services/agent.service';
import { AgentModalComponent } from 'src/app/modals/agent-modal/agent-modal.component';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-manage-agents',
  templateUrl: './manage-agents.page.html',
  styleUrls: ['./manage-agents.page.scss'],
})
export class ManageAgentsPage implements OnInit {

  id: number = 0;
  photoUrl: string = '';
  agents: any[] = [];
  agentColumns: any[] = [];
  agentSearchTerm: string = '';
  filteredAgents: any[] = [];
  constructor(private agentService:AgentService,private adminService: AdminService,private modalController: ModalController,private alertController: AlertController,private authService : AuthService) { }

  ngOnInit() {
    this.agentColumns = [
      { key: 'id', title: 'Id' },
      { key: 'image', title: 'Image', type: 'image' },
      { key: 'nom', title: 'Name' },
      { key: 'prenom', title: 'Prename' },
      { key: 'email', title: 'Email' },
      { key: 'adresse', title: 'Adress' },
      { key: 'telephone', title: 'Phone' },
      { key: 'tirasse.nom', title: 'Terrace' },
    ];
    this.refreshUserData();
    this.authService.getTokenRefreshes().subscribe(() => {
      this.refreshUserData();
    });
    this.getAgents();
  }
  async openAgentModal(agent?: any) {
    const modal = await this.modalController.create({
      component: AgentModalComponent,
      componentProps: { agent }
    });
    modal.onDidDismiss().then(() => {
      this.getAgents();
    });
    return await modal.present();
  }
  getAgents() {
    this.agentService.getAll().subscribe(agents => {
      this.agents = agents;
      this.filteredAgents = agents;
    });
  }

  filterAgents() {
    this.filteredAgents = this.agents.filter(agent =>
      agent.nom.toLowerCase().includes(this.agentSearchTerm.toLowerCase()) ||
      agent.prenom.toLowerCase().includes(this.agentSearchTerm.toLowerCase()) ||
      agent.email.toLowerCase().includes(this.agentSearchTerm.toLowerCase()) ||
      agent.adresse.toLowerCase().includes(this.agentSearchTerm.toLowerCase()) ||
      agent.telephone.toLowerCase().includes(this.agentSearchTerm.toLowerCase())
    );
  }
  async onDeleteAgent(agent: any) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: `Are you sure you want to delete agent ${agent.nom}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Delete canceled');
          }
        }, {
          text: 'Delete',
          handler: () => {
            this.agentService.delete(agent.id).subscribe(() => {
              this.agents = this.agents.filter(a => a.id !== agent.id);
              this.filterAgents();
            });
          }
        }
      ]
    });
  
    await alert.present();
  }
  onEditAgent(agent: any) {
    this.openAgentModal(agent);
  }
  private refreshUserData() {
    this.id = this.authService.getIdFromToken();
    this.adminService.getAdminById(this.id).subscribe(user => {
      if (user.image) {
        this.photoUrl = `data:image/jpeg;base64,${user.image}`;
      }
      user.role = "Admin";
      this.authService.setData(user);
    });
  }
}
