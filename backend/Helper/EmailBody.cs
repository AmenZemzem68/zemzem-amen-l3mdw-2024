using System;
namespace PfeApi.Helper
{
    public static class EmailBody
    {
        public static string EmailStringBody(string email , string emailToken) {
            return $@"<body style=""font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;"">

<table align=""center"" border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""max-width: 600px; background-color: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);"">
    <tr>
        <td align=""center"" style=""padding: 20px;"">
            <h2 style=""color: #333333;"">Reset Your Password</h2>
        </td>
    </tr>
    <tr>
        <td style=""padding: 20px;"">
            <p style=""color: #666666;"">You have requested to reset your password for your restaurant app account. Click the button below to reset it.</p>
        </td>
    </tr>
    <tr>
        <td align=""center"" style=""padding: 20px;"">
            <a href=""http://localhost:8100/reset-password?email={email}&code={emailToken}"" style=""background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;"">Reset Password</a>
        </td>
    </tr>
    <tr>
        <td style=""padding: 20px;"">
            <p style=""color: #666666;"">If you did not request a password reset, please ignore this email or contact our support team.</p>
        </td>
    </tr>
    <tr>
        <td style=""padding: 20px;"">
            <p style=""color: #999999;"">Regards,<br>The Restaurant App Team</p>
        </td>
    </tr>
</table>

</body>";
        }
    }
}
