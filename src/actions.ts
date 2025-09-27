import { getErrorString } from "./lib/node/index.js"
import type { ModuleInstance } from "./main.js"
import { groupPlaylist } from "./services/pisignage/schemas.js"

export function UpdateActions(self: ModuleInstance): void {
  self.setActionDefinitions({
    sample_action: {
      name: "Select playlist",
      options: [
        {
          useVariables: true,
          type: "textinput",
          id: "groupId",
          label: "Group ID",
          required: true,
        },
        {
          useVariables: true,
          type: "textinput",
          id: "playlist",
          label: "Playlist name",
          required: true,
        },
        {
          useVariables: true,
          type: "textinput",
          id: "advPlaylist",
          label: "Playlist name for advertisements",
        },
        {
          type: "number",
          id: "advInterval",
          label: "Duration in seconds between ads",
          default: 2,
          min: 1,
          max: 60 * 60 * 24, // 1 day
        },
        {
          type: "number",
          id: "advCount",
          label: "Number of ads to play in succession",
          default: 2,
          min: 1,
          max: 100,
        },
      ],
      callback: async (event) => {
        try {
          const config = groupPlaylist.parse({
            ...event.options,
            playlists: [event.options.playlist],
            advPlaylists: [event.options.advPlaylist],
          })
          self.log("info", `Selecting playlist ${JSON.stringify({ group: config.groupId, playlist: config.playlists.at(0) })}`)

          self.client.selectPlaylists([config])
        } catch (err) {
          console.error(err)
          self.log("error", getErrorString(err, "Selecting playlist failed"))
        }
      },
    },
  })
}
