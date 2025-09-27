import { initClient, tsRestFetchApi } from "@ts-rest/core"
import { contract } from "../../lib/ts-rest/pisignage-contract.js"
import { clientConfig, GroupPlaylist, PiSignageClientConfig } from "./schemas.js"
import path from "path/posix"
import z from "zod"

export class PiSignageClient {
  authToken: string
  #config: PiSignageClientConfig
  pisignage

  constructor(config: PiSignageClientConfig) {
    this.authToken = ""
    this.#config = config = clientConfig.parse(config)
    this.pisignage = this.#createClient()
  }

  async refreshToken() {
    console.info("Renewing PiSignage authentication token")
    return this.pisignage.login({
      body: {
        email: this.#config.username,
        password: this.#config.password,
        getToken: true,
      },
    })
      .then((response) => {
        if (response.status === 200 && response.body.token) {
          console.info("PiSignage authentication token renewed successfully")
          this.authToken = response.body.token
          return this.authToken
        }
        return undefined
      })
  }

  #createClient() {
    console.info("Creating PiSignage API client at", this.#config.serverUrl)
    return initClient(contract, {
      baseUrl: path.join(this.#config.serverUrl, "api"),
      baseHeaders: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      api: async (args) => {
        if (!this.authToken) {
          this.authToken = "pending"
          await this.refreshToken()
        }

        args.headers["x-access-token"] = this.authToken

        return tsRestFetchApi(args)
      }
    })
  }

  selectPlaylists(groups: GroupPlaylist[]) {
    for (const group of groups) {
      this.#selectPlaylist(group)
        .catch(err => {
          console.error(err)
        })
    }
  }

  async #selectPlaylist(group: GroupPlaylist) {
    const playlists: z.infer<typeof import("../../lib/ts-rest/pisignage-contract.js").GroupPlaylist>[] = []
    const assets: string[] = []

    for (const playlist of group.playlists) {
      try {
        const info = await this.getPlaylistInfo(playlist)

        assets.push(...this.#getPlaylistAssetNames(info))

        playlists.push({
          name: playlist,
          plType: "regular",
          skipForSchedule: false,
          settings: {
            durationEnable: false,
            timeEnable: false,
            ...info.settings,
          }
        })
      } catch(err) {
        console.error(err)
      }

    }
    for (const playlist of group.advPlaylists) {
      try {
        const info = await this.getPlaylistInfo(playlist)

        assets.push(...this.#getPlaylistAssetNames(info))

        playlists.push({
          name: playlist,
          plType: "advt",
          skipForSchedule: false,
          settings: {
            durationEnable: false,
            timeEnable: false,
            ...info.settings,
            ads: {
              adPlaylist: true,
              adCount: group.advCount || 1,
              adInterval: group.advInterval || 20,
            },
          },
        })
      } catch(err) {
        console.error(err)
      }
    }

    await this.pisignage.updateGroupsGroupId({
      params: {
        groupId: group.groupId,
      },
      body: {
        deployedPlaylists: playlists,
        playlists,
        deployedAssets: assets,
        assets,
        lastDeployed: new Date().getTime(),
        deploy: true,
      },
    })
  }

  /**
   * Get full playlist info
   */
  async getPlaylistInfo(playlistName: string) {
    const info = await this.pisignage.playlistsPlaylistName({
      params: { playlistName },
    })

    if (info.status !== 200) throw new Error(String(info.body))
    if (!info.body.data) throw new Error(`Cannot get playlist info 'data': ${playlistName}`)

    return info.body.data
  }

  /**
   * Get playlist assets as an array
   */
  #getPlaylistAssetNames(playlist: Awaited<ReturnType<PiSignageClient["getPlaylistInfo"]>>): string[] {
    const ret = [`__${playlist.name}.json`] // the playlist json configuration file is required
    for (const file of playlist?.assets || []) {
      if (file.filename) ret.push(file.filename)
    }
    return ret
  }
}
