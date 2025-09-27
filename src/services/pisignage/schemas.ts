import z from "zod"

export const groupPlaylist = z.object({
  groupId: z.string(), // group id
  playlists: z.array(z.string()), // playlists to play
  advPlaylists: z.array(z.string()), // advertisement playlist names
  advInterval: z.number().positive().max(60 * 60 * 24).default(20), // time in seconds, 1 day max
  advCount: z.number().positive().default(1), // number of ads played
})

export const clientConfig = z.object({
  serverUrl: z.string().url(),
  username: z.string(),
  password: z.string(),
})

export type GroupPlaylist = z.infer<typeof groupPlaylist>
export type PiSignageClientConfig = z.infer<typeof clientConfig>
