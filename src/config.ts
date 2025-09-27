import { type SomeCompanionConfigField } from "@companion-module/base"

export interface ModuleConfig {
	host: string
	port: number
}

export function GetConfigFields(): SomeCompanionConfigField[] {
  return [
    {
      type: "static-text",
      id: "info",
      width: 12,
      label: "Information",
      value: [
        "This module is used to control signage displays with PiSignage. You must enter your server URL and user login for authentication.",
        "You can enter the group and playlist id for every action that you create.",
      ].join(" "),
    },
    {
      type: "textinput",
      id: "serverUrl",
      label: "Your PiSignage server url",
      width: 12,
      default: "https://pisignage.com",
      required: true,
    },
    {
      type: "textinput",
      id: "username",
      label: "Username (email)",
      width: 12,
      default: "",
      required: true,
    },
    {
      type: "textinput",
      id: "password",
      label: "Password",
      width: 12,
      default: "",
      required: true,
    },
    // {
    //   type: "static-text",
    //   id: "rejectUnauthorizedInfo",
    //   label: "Unauthorized certificates",
    //   width: 12,
    //   value: `
    //       <hr />
    //       <h5>WARNING</h5>
    //       This module rejects server certificates considered invalid for the following reasons:
    //       <ul>
    //         <li>Certificate is expired</li>
    //         <li>Certificate has the wrong host</li>
    //         <li>Untrusted root certificate</li>
    //         <li>Certificate is self-signed</li>
    //       </ul>
    //       <p>
    //         We DO NOT recommend turning off this option. However, if you NEED to connect to a host
    //         with a self-signed certificate you will need to set <strong>Unauthorized Certificates</strong>
    //         to <strong>Accept</strong>.
    //       </p>
    //       <p><strong>USE AT YOUR OWN RISK!<strong></p>
    //     `,
    // },
    // {
    //   type: "dropdown",
    //   id: "rejectUnauthorized",
    //   label: "Unauthorized Certificates",
    //   width: 6,
    //   default: "true",
    //   choices: [
    //     { id: "true", label: "Reject" },
    //     { id: "false", label: "Accept - Use at your own risk!" },
    //   ],
    // },
  ]
}
