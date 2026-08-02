export const welcomeTemplate = (name: string) => `
<div style="background:#0f172a;padding:40px;font-family:sans-serif;color:#fff">
  <div style="max-width:500px;margin:auto;background:#111827;padding:30px;border-radius:12px;text-align:center">

    <h2 style="color:#8b5cf6;">¡Bienvenido ${name}! 🎉</h2>

    <p style="color:#cbd5f5;">
      Tu cuenta fue creada correctamente en <b>Turnero Digital</b>.
    </p>

    <p style="margin-top:20px;color:#9ca3af;">
      Ahora ya podés gestionar tus turnos de forma rápida y segura.
    </p>

    <div style="margin-top:30px">
      <a href="${process.env.FRONTEND_URL}" 
         style="background:linear-gradient(90deg,#6366f1,#8b5cf6);
                padding:12px 24px;
                color:#fff;
                text-decoration:none;
                border-radius:8px;
                font-weight:bold;">
        Ir al sistema
      </a>
    </div>

  </div>
</div>
`