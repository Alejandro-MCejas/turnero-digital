
export const resetPasswordTemplate = (resetLink: string) => {
    return `
<body style="margin:0; padding:0; background-color:#0f172a; font-family:Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f172a; padding:20px 0;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:500px; background:#020617; border-radius:16px; padding:30px; text-align:center;">
          
          <tr>
            <td>
              <h2 style="color:#e2e8f0; margin-bottom:10px;">
                Recuperación de contraseña
              </h2>

              <p style="color:#94a3b8; font-size:14px;">
                Recibimos una solicitud para restablecer tu contraseña.
              </p>

              <a href="${resetLink}" 
                 style="
                   display:inline-block;
                   margin:20px 0;
                   padding:14px 22px;
                   background:linear-gradient(135deg, #6366f1, #8b5cf6);
                   color:white;
                   text-decoration:none;
                   border-radius:10px;
                   font-weight:bold;
                   font-size:14px;
                 ">
                 Resetear contraseña
              </a>

              <p style="color:#64748b; font-size:12px;">
                Este enlace expirará en 15 minutos.
              </p>

              <p style="color:#475569; font-size:11px;">
                Si no solicitaste esto, podés ignorar este correo.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
`


}