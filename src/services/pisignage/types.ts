import { GroupPlaylist } from "./schemas.js"

export type GroupName = "TV group"|"Menu group"

export type GroupPlaylistValue = Omit<GroupPlaylist, "advPlaylists">
export type GroupAdvPlaylistValue = Omit<GroupPlaylist, "playlists">

export type GroupPlaylistOption = {
  key: number|string
  label: string
  value: GroupPlaylistValue[]
}

export type GroupAdvPlaylistOption = {
  key: number|string
  label: string
  value: GroupAdvPlaylistValue[]
}
