interface ForgotPasswordEmailProps {
  name: string
  avatarUrl: string | null
  passwordRecoveryLink: string
}

export function forgotPasswordEmailTemplate({
  name,
  avatarUrl,
  passwordRecoveryLink,
}: ForgotPasswordEmailProps) {
  return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">

  <head>
    <link rel="preload" as="image" href="${avatarUrl}" />
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" /><!--$-->
  </head>
  </div>

  <body style="background-color:rgb(255,255,255);margin-top:auto;margin-bottom:auto;margin-left:auto;margin-right:auto;font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;;padding-left:0.5rem;padding-right:0.5rem">
    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="border-width:1px;border-style:solid;border-color:rgb(234,234,234);border-radius:0.25rem;margin-top:40px;margin-bottom:40px;margin-left:auto;margin-right:auto;padding:20px;max-width:465px">
      <tbody>
        <tr style="width:100%">
          <td>
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="margin-top:32px">
              <tbody>
                <tr>
                  <td><img alt="Vercel" height="37" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAjouFTAB2PcXfnfkjy1SUjkaMeaymXnzoOA&s" style="margin-top:0px;margin-bottom:0px;margin-left:auto;margin-right:auto;display:block;outline:none;border:none;text-decoration:none" width="40" /></td>
                </tr>
              </tbody>
            </table>
            <h1 style="color:rgb(0,0,0);font-size:24px;font-weight:400;text-align:center;padding:0px;margin-top:30px;margin-bottom:30px;margin-left:0px;margin-right:0px">Password <strong>Recovery</strong></h1>
            
             ${
               avatarUrl &&
               `<table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                <tbody>
                  <tr>
                    <td>
                      <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                        <tbody style="width:100%">
                          <tr style="width:100%">
                            <td align="center" data-id="__react-email-column"><img height="64" src="${avatarUrl}" style="border-radius:9999px;display:block;outline:none;border:none;text-decoration:none" width="64" /></td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>`
             }
            
            <p style="color:rgb(0,0,0);font-size:14px;line-height:24px;margin:16px 0">Hello <!-- -->${name}<!-- -->,</p>
            <p style="color:rgb(0,0,0);font-size:14px;line-height:24px;margin:16px 0">
              Someone recently requested a password change for your account. If this was you, you can set a new password here:
            </p>
           
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="text-align:center;margin-top:32px;margin-bottom:32px">
              <tbody>
                <tr>
                  <td><a href="${passwordRecoveryLink}" style="background-color:rgb(0,0,0);border-radius:0.25rem;color:rgb(255,255,255);font-size:12px;font-weight:600;text-decoration-line:none;text-align:center;padding-left:1.25rem;padding-right:1.25rem;padding-top:0.75rem;padding-bottom:0.75rem;line-height:100%;text-decoration:none;display:inline-block;max-width:100%;mso-padding-alt:0px;padding:12px 20px 12px 20px" target="_blank"><span><!--[if mso]><i style="mso-font-width:500%;mso-text-raise:18" hidden>&#8202;&#8202;</i><![endif]--></span><span style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:9px">Reset the password</span><span><!--[if mso]><i style="mso-font-width:500%" hidden>&#8202;&#8202;&#8203;</i><![endif]--></span></a></td>
                </tr>
              </tbody>
            </table>
            <p style="color:rgb(0,0,0);font-size:14px;line-height:24px;margin:16px 0">or copy and paste this URL into your browser:<!-- --> <a href="${passwordRecoveryLink}" style="color:rgb(37,99,235);text-decoration-line:none;text-decoration:none" target="_blank">${passwordRecoveryLink}</a></p>
            <p style="color:rgb(0,0,0);font-size:14px;line-height:24px;margin:16px 0">If you don't want to change your password or didn't request this, just ignore and delete this message.</p>
          </td>
        </tr>
      </tbody>
    </table><!--/$-->
  </body>
</html>
  `
}
