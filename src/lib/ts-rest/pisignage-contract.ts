import { initContract } from "@ts-rest/core"
import { z } from "zod"

const c = initContract()

const Credentials = z
  .object({
    email: z.string(),
    password: z.string(),
    getToken: z.boolean().optional(),
  })
  .passthrough()
const UserSettings = z
  .object({
    newLayoutsEnable: z.boolean().optional(),
    systemMessagesHide: z.boolean().optional(),
    forceTvOn: z.boolean().optional(),
    disableCECPowerCheck: z.boolean().optional(),
    hideWelcomeNotice: z.boolean().optional(),
    defaultDuration: z.number().int().optional(),
    language: z.string().optional(),
    logo: z.string().optional(),
    url: z.string().optional(),
    sshPassword: z.string().optional(),
    enableLog: z.boolean().optional(),
    reportIntervalMinutes: z.number().int().optional(),
    licenseOnly: z.boolean().optional(),
    playerMinimumVersion: z.string().optional(),
    scheduleUpdateTime: z.string().optional(),
    scheduleUpdateVersion: z.string().optional(),
    shareableLabels: z.boolean().optional(),
  })
  .passthrough()
const UserInfo = z
  .object({
    _id: z.string().optional(),
    username: z.string().optional(),
    email: z.string().email().optional(),
    settings: UserSettings.optional(),
  })
  .passthrough()
const SessionInfo = z
  .object({ userInfo: UserInfo.optional(), token: z.string().optional() })
  .passthrough()
const UserDetailsOutput = z
  .object({
    _id: z.string().optional(),
    username: z.string().optional(),
    name: z.string().optional(),
    email: z.string().email().optional(),
    active: z.boolean().optional(),
    parentAccount: z.string().optional(),
    role: z.enum(["User", "Reseller", "Client", "Collaborator"]).optional(),
    collaborators: z.array(z.string()).optional(),
    collaboratorRights: z.array(z.string()).optional(),
    licensesPurchased: z.number().int().optional().default(0),
    licensesUsed: z.number().int().optional().default(0),
    storageSpace: z.number().int().optional().default(0),
    serverLicenses: z.number().int().optional().default(0),
    serverLicensesUsed: z.number().int().optional().default(0),
    serverCredits: z.number().int().optional().default(0),
    nextBilling: z.string().optional(),
    nextCredit: z.string().optional(),
    freeCredits: z.number().int().optional().default(0),
    resetEmailTime: z.string().optional(),
    settings: UserSettings.optional(),
    createdAt: z.string().optional(),
    createdBy: z.string().optional(),
    lastLogedin: z.string().optional(),
    signedFromIp: z.string().optional(),
    iat: z.number().int().optional(),
    exp: z.number().int().optional(),
  })
  .passthrough()
const token = z.object({ token: z.string() }).passthrough()
const login_failure = z
  .object({ message: z.string().optional() })
  .passthrough()
const Schedule = z
  .object({
    durationEnable: z.boolean().optional().default(false),
    startdate: z.string().optional(),
    enddate: z.string().optional(),
    timeEnable: z.boolean().optional().default(false),
    starttime: z.string().optional(),
    endtime: z.string().optional(),
    weekdays: z
      .array(
        z.union([
          z.literal(1),
          z.literal(2),
          z.literal(3),
          z.literal(4),
          z.literal(5),
          z.literal(6),
          z.literal(7),
        ]),
      )
      .optional(),
    monthdays: z
      .array(
        z.union([
          z.literal(1),
          z.literal(2),
          z.literal(3),
          z.literal(4),
          z.literal(5),
          z.literal(6),
          z.literal(7),
          z.literal(8),
          z.literal(9),
          z.literal(10),
          z.literal(11),
          z.literal(12),
          z.literal(13),
          z.literal(14),
          z.literal(15),
          z.literal(16),
          z.literal(17),
          z.literal(18),
          z.literal(19),
          z.literal(20),
          z.literal(21),
          z.literal(22),
          z.literal(23),
          z.literal(24),
          z.literal(25),
          z.literal(26),
          z.literal(27),
          z.literal(28),
          z.literal(29),
          z.literal(30),
          z.literal(31),
        ]),
      )
      .optional(),
    weeknumbers: z
      .object({
        "0": z.boolean().optional(),
        "1": z.boolean().optional(),
        "2": z.boolean().optional(),
        "3": z.boolean().optional(),
        enable: z.boolean().optional(),
      })
      .passthrough()
      .optional(),
  })
  .passthrough()
const Ads = z
  .object({
    adPlaylist: z.boolean().optional(),
    noMainPlay: z.boolean().optional(),
    adCount: z.number().int().optional().default(1),
    adInterval: z.number().int().optional().default(30),
  })
  .passthrough()
const Domination = z
  .object({
    enable: z.boolean().optional(),
    timeInterval: z.number().int().optional(),
  })
  .passthrough()
const Audio = z
  .object({
    enable: z.boolean().optional(),
    hdmi: z.boolean().optional(),
    random: z.boolean().optional(),
    volume: z.number().int().optional(),
  })
  .passthrough()
const Event = z
  .object({
    enable: z.boolean().optional(),
    duration: z.number().int().optional(),
  })
  .passthrough()
const OnlineOnly = z.boolean().default(false)
export const GroupPlaylist = z
  .object({
    skipForSchedule: z.boolean().optional().default(false),
    name: z.string().optional(),
    settings: Schedule.and(
      z
        .object({
          ads: Ads.optional(),
          domination: Domination.optional(),
          audio: Audio.optional(),
          event: Event.optional(),
          onlineOnly: OnlineOnly.optional(),
        })
        .passthrough(),
    ).optional(),
  })
  .passthrough()
const AssetValidity = z
  .object({
    enable: z.boolean().optional(),
    startdate: z.string().optional(),
    enddate: z.string().optional(),
    starthour: z.number().int().optional().default(0),
    endhour: z.number().int().optional().default(24),
  })
  .passthrough()
const Ticker = z
  .object({
    enable: z.boolean().optional(),
    bannerText: z.boolean().optional(),
    behavior: z
      .enum(["slide", "scroll", "scrollRight", "openvg_left", "openvg_right"])
      .optional()
      .default("slide"),
    style: z.string().optional(),
    tickerFontSize: z.number().int().optional().default(28),
    tickerWidth: z.number().int().optional().default(0),
    tickerX: z.number().int().optional().default(0),
    tickerY: z.number().int().optional().default(0),
    tickerSpeed: z
      .union([
        z.literal(1),
        z.literal(2),
        z.literal(3),
      ])
      .optional()
      .default(3),
    messages: z.string().optional(),
    rss: z
      .object({
        enable: z.boolean().optional(),
        useDescription: z.boolean().optional(),
        feedDelay: z.number().int().optional().default(10),
        encodeAsBinary: z.boolean().optional(),
        link: z.string().optional(),
      })
      .passthrough()
      .optional(),
  })
  .passthrough()
const Sleep = z
  .object({
    enable: z.boolean().optional(),
    ontime: z.string().optional(),
    offtime: z.string().optional(),
  })
  .passthrough()
const Reboot = z
  .object({
    enable: z.boolean().optional().default(false),
    time: z.string().optional(),
  })
  .passthrough()
const GroupInfo = z
  .object({
    _id: z.string().optional(),
    name: z.string().optional(),
    playlistToSchedule: z.string().optional(),
    combineDefaultPlaylist: z.boolean().optional().default(false),
    playAllEligiblePlaylists: z.boolean().optional().default(false),
    shuffleContent: z.boolean().optional().default(false),
    alternateContent: z.boolean().optional().default(false),
    assetsValidity: z.array(AssetValidity).optional(),
    assets: z.array(z.string()).optional(),
    deployedAssets: z.array(z.string()).optional(),
    playlists: z.array(GroupPlaylist).optional(),
    deployedPlaylists: z.array(GroupPlaylist).optional(),
    ticker: Ticker.optional(),
    deployedTicker: Ticker.optional(),
    labels: z.array(z.string()).optional(),
    installation: z.string().optional(),
    lastDeployed: z.number().int().optional(),
    resolution: z.enum(["auto", "720p", "1080p", "PAL", "NTSC"]).optional(),
    orientation: z.enum(["landscape", "portrait", "portrait270"]).optional(),
    monitorArrangement: z
      .object({
        mode: z.enum(["mirror", "tile-horizontal", "tile-vertical"]).optional(),
        reverse: z.boolean().optional(),
      })
      .passthrough()
      .optional(),
    animationEnable: z.boolean().optional(),
    animationType: z.enum(["blend", "left", "right", "up", "down"]).optional(),
    signageBackgroundColor: z.string().optional(),
    logo: z.string().optional(),
    logox: z.number().int().optional(),
    logoy: z.number().int().optional(),
    showClock: z
      .object({
        enable: z.boolean().optional().default(false),
        position: z.enum(["top", "bottom"]).optional(),
        format: z.union([
          z.literal(12),
          z.literal(24),
          z.literal("12d"),
          z.literal("24d"),
        ]).optional(),
      })
      .passthrough()
      .optional(),
    urlReloadDisable: z.boolean().optional().default(true),
    keepWeblinksInMemory: z.boolean().optional().default(false),
    loadPlaylistOnCompletion: z.boolean().optional(),
    sleep: Sleep.optional(),
    omxVolume: z.number().int().optional(),
    timeToStopVideo: z.number().int().optional().default(0),
    resizeAssets: z.boolean().optional(),
    imageLetterboxed: z.boolean().optional(),
    videoKeepAspect: z.boolean().optional(),
    emergencyMessage: z
      .object({
        enable: z.boolean().optional().default(false),
        vPos: z.enum(["top", "middle", "bottom"]).optional(),
        hPos: z.enum(["left", "middle", "right"]).optional(),
        msg: z.string().optional(),
      })
      .passthrough()
      .optional(),
    reboot: Reboot.optional(),
    deployTime: z.string().optional(),
    deployEveryday: z.boolean().optional().default(false),
    everydayDeployTime: z.string().optional(),
    enableMpv: z.boolean().optional().default(false),
    mpvAudioDelay: z.string().optional().default("0"),
    selectedVideoPlayer: z.enum(["default", "mpv", "cvlc"]).optional(),
    disableWebUi: z.boolean().optional().default(false),
    disableHwWidgets: z.boolean().optional().default(false),
    disableWarnings: z.boolean().optional().default(false),
    enablePio: z.boolean().optional().default(false),
    disableAp: z.boolean().optional().default(false),
    kioskUi: z
      .object({
        enable: z.boolean().optional().default(false),
        url: z.string().optional(),
        timeout: z.number().int().optional().default(NaN),
      })
      .passthrough()
      .optional(),
  })
  .passthrough()
const Labels = z.array(z.string())
const GroupIds = z.array(z.string())
const Resolution = z
  .object({ width: z.string().optional(), height: z.string().optional() })
  .passthrough()
const DbDataInfo = z
  .object({
    name: z.string().optional(),
    type: z.string().optional(),
    duration: z.string().optional(),
    size: z.string().optional(),
    thumbnail: z.string().optional(),
    validity: AssetValidity.optional(),
    groupIds: GroupIds.optional(),
    playlists: z.array(z.string()).optional(),
    labels: Labels.optional(),
    resolution: Resolution.optional(),
  })
  .passthrough()
const AssetLinkInfo = z
  .object({
    name: z.string().optional(),
    type: z
      .enum([
        ".tv",
        ".stream",
        ".radio",
        ".link",
        ".weblink",
        ".mrss",
        ".txt",
        ".local",
      ])
      .optional(),
    link: z.string().optional(),
    hideTitle: z
      .enum(["none", "title", "description", "onlytitle", "onlydescription"])
      .optional(),
    numberOfItems: z.number().int().optional(),
    zoom: z.number().optional(),
    message: z.string().optional(),
    style: z.string().optional(),
  })
  .passthrough()
const PlayerInfoWritable = z
  .object({
    name: z.string().optional(),
    TZ: z.string().optional(),
    cpuSerialNumber: z.string(),
    managed: z.boolean().optional(),
    configLocation: z.string().optional(),
    labels: z.array(z.string()).optional(),
    group: z
      .object({ _id: z.string().optional(), name: z.string().optional() })
      .passthrough()
      .optional(),
  })
  .passthrough()
const PlayerInfo = PlayerInfoWritable.and(
  z
    .object({
      _id: z.string().optional(),
      selfGroupId: z.string().optional(),
      version: z.string().optional(),
      platform_version: z.string().optional(),
      myIpAddress: z.string().optional(),
      ip: z.string().optional(),
      location: z.string().optional(),
      playlistOn: z.boolean().optional(),
      cecTvStatus: z.boolean().optional(),
      tvStatus: z.boolean().optional(),
      syncInProgress: z.boolean().optional(),
      currentPlaylist: z.string().optional(),
      licensed: z.boolean().optional(),
      installation: z.string().optional(),
      lastUpload: z.number().int().optional(),
      lastReported: z.number().int().optional(),
    })
    .passthrough(),
)
const PlaylistAssetRow = z
  .object({
    filename: z.string().optional(),
    duration: z.number().int().optional(),
    isVideo: z.boolean().optional(),
    selected: z.boolean().optional(),
    option: z
      .object({
        main: z.boolean().optional(),
        side: z.boolean().optional(),
        bottom: z.boolean().optional(),
        zone4: z.boolean().optional(),
        subduration: z.number().optional(),
        bannerText: z.string().optional(),
      })
      .passthrough()
      .optional(),
    fullscreen: z.boolean().optional(),
    side: z.string().optional(),
    bottom: z.string().optional(),
    zone4: z.string().optional(),
    zone5: z.string().optional(),
    zone6: z.string().optional(),
  })
  .passthrough()
const Layout = z.union([
  z.literal(1),
  z.literal("2a"),
  z.literal("2b"),
  z.literal("2c"),
  z.literal("2d"),
  z.literal("3a"),
  z.literal("3b"),
  z.literal("3c"),
  z.literal("3d"),
  z.literal("4a"),
  z.literal("4b"),
  z.literal("4c"),
  z.literal("4d"),
  z.literal("2ap"),
  z.literal("2bp"),
  z.literal("2ap270"),
  z.literal("custom"),
  z.literal("customp"),
  z.literal("customp270"),
])
const VideoWindowProperties = z
  .object({
    length: z.number().int().optional(),
    width: z.number().int().optional(),
    xoffset: z.number().int().optional(),
    yoffset: z.number().int().optional(),
  })
  .passthrough()
const ZoneVideoWindow = z
  .object({
    side: VideoWindowProperties.optional(),
    bottom: VideoWindowProperties.optional(),
    zone4: VideoWindowProperties.optional(),
  })
  .passthrough()
const Playlist = z
  .object({
    name: z.string().optional(),
    version: z.number().int().optional(),
    layout: Layout.optional(),
    templateName: z.string().optional(),
    videoWindow: VideoWindowProperties.optional(),
    zoneVideoWindow: ZoneVideoWindow.optional(),
    assets: z.array(PlaylistAssetRow).optional(),
    settings: z
      .object({
        ticker: Ticker.optional(),
        ads: Ads.optional(),
        domination: Domination.optional(),
        audio: Audio.optional(),
        event: Event.optional(),
        onlineOnly: OnlineOnly.optional(),
      })
      .passthrough()
      .optional(),
    schedule: Schedule.optional(),
    groupIds: GroupIds.optional(),
    labels: Labels.optional(),
  })
  .passthrough()
const Label = z
  .object({
    name: z.string().optional(),
    _id: z.string().optional(),
    installation: z.string().optional(),
    mode: z
      .enum(["assets", "players", "groups", "playlists"])
      .optional()
      .default("assets"),
    groupIds: GroupIds.optional(),
  })
  .passthrough()
const Dns = z
  .object({ primary: z.string().optional(), secondary: z.string().optional() })
  .passthrough()
const playerSettings = z
  .object({
    name: z.string().optional(),
    localName: z.string().optional(),
    note: z.string().optional(),
    version: z.string().optional(),
    platform_version: z.string().optional(),
    currentVersion: z.string().optional(),
    ipsettings: z.string().optional(),
    wifi: z.string().optional(),
    overscan: z.string().optional(),
    orientation: z.string().optional(),
    resolution: z.string().optional(),
    omxVolume: z.string().optional(),
    user: z.object({ name: z.string().optional() }).passthrough().optional(),
    server: z
      .object({ config: z.string().optional(), media: z.string().optional() })
      .passthrough()
      .optional(),
    sleep: Sleep.optional(),
    reboot: Reboot.optional(),
    dns: Dns.optional(),
  })
  .passthrough()
const playlistStart = z
  .object({ play: z.boolean().optional().default(true) })
  .passthrough()
const playlistStop = z
  .object({ stop: z.boolean().optional().default(true) })
  .passthrough()

export const schemas = {
  Credentials,
  UserSettings,
  UserInfo,
  SessionInfo,
  UserDetailsOutput,
  token,
  login_failure,
  Schedule,
  Ads,
  Domination,
  Audio,
  Event,
  OnlineOnly,
  GroupPlaylist,
  AssetValidity,
  Ticker,
  Sleep,
  Reboot,
  GroupInfo,
  Labels,
  GroupIds,
  Resolution,
  DbDataInfo,
  AssetLinkInfo,
  PlayerInfoWritable,
  PlayerInfo,
  PlaylistAssetRow,
  Layout,
  VideoWindowProperties,
  ZoneVideoWindow,
  Playlist,
  Label,
  Dns,
  playerSettings,
  playlistStart,
  playlistStop,
}

export const contract = c.router({
  login: {
    method: "POST",
    path: "/session",
    summary: "Logs user into the server and returns token if getToken is true.",
    body: Credentials,
    contentType: "application/json",
    responses: { 200: SessionInfo, 401: login_failure },
  },
  logoutFromTheServer: {
    method: "DELETE",
    path: "/session",
    summary: "Logout from the server",
    body: c.noBody(),
    responses: { 200: c.noBody() },
  },
  tokenLogin: {
    method: "POST",
    path: "/token-session",
    summary: "Logs user into the server using the token",
    body: token,
    contentType: "application/json",
    responses: { 200: UserInfo, 401: login_failure },
  },
  getInformationAboutAllTheFilesThatHaveBeenUploaded: {
    method: "GET",
    path: "/files",
    summary: "Get information about all the files that have been uploaded",
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          data: z
            .object({
              sizes: z
                .object({
                  total: z.number().int().optional(),
                  used: z.number().int().optional(),
                })
                .passthrough()
                .optional(),
              files: z.array(z.string()).optional(),
              dbdata: z.array(DbDataInfo).optional(),
              systemAssets: z.array(z.string()).optional(),
            })
            .passthrough()
            .optional(),
          success: z.boolean().optional(),
        })
        .passthrough(),
    },
  },
  uploadFile: {
    method: "POST",
    path: "/files",
    summary: "Upload file(s)",
    body: z.string(),
    contentType: "multipart/form-data",
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          success: z.boolean().optional(),
          data: z
            .object({
              name: z.string().optional(),
              size: z.number().int().optional(),
              type: z.string().optional(),
            })
            .passthrough()
            .optional(),
        })
        .passthrough(),
    },
  },
  postupload: {
    method: "POST",
    path: "/postupload",
    summary:
      "Call this API immediately after file upload(previous API) to store file details",
    body: z
      .object({
        files: z
          .array(
            z
              .object({
                name: z.string().optional(),
                type: z.string().optional(),
                size: z.number().int().optional(),
              })
              .passthrough(),
          )
          .optional(),
        categories: z.array(z.string()).optional(),
      })
      .passthrough(),
    contentType: "application/json",
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          success: z.boolean().optional(),
        })
        .passthrough(),
    },
  },
  getfilesFile: {
    method: "GET",
    path: "/files/:file",
    summary: "Get information about an asset",
    pathParams: z.object({ file: z.string() }),
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          data: z
            .object({
              name: z.string().optional(),
              size: z.string().optional(),
              ctime: z.string().optional(),
              path: z.string().optional(),
              type: z.string().optional(),
              dbdata: DbDataInfo.optional(),
            })
            .passthrough()
            .optional(),
          success: z.boolean().optional().default(true),
        })
        .passthrough(),
    },
  },
  renameAfile: {
    method: "POST",
    path: "/files/:file",
    summary: "Update asset details or rename the asset",
    pathParams: z.object({ file: z.string() }),
    body: z.object({ dbdata: DbDataInfo.optional() }).passthrough(),
    contentType: "application/json",
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          data: DbDataInfo.optional(),
          success: z.boolean().optional(),
        })
        .passthrough(),
    },
  },
  deletefilesFile: {
    method: "DELETE",
    path: "/files/:file",
    summary: "Remove an asset or playlist",
    pathParams: z.object({ file: z.string() }),
    body: c.noBody(),
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          data: z.string().optional(),
          success: z.boolean().optional(),
        })
        .passthrough(),
    },
  },
  links: {
    method: "POST",
    path: "/links",
    summary: "Add a file corresponding to a link",
    body: z
      .object({
        details: AssetLinkInfo.optional(),
        categories: z.array(z.string()).optional(),
      })
      .passthrough(),
    contentType: "application/json",
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          success: z.boolean().optional(),
        })
        .passthrough(),
    },
  },
  linksFile: {
    method: "GET",
    path: "/links/:file",
    summary: "Get details of the link file",
    pathParams: z.object({ file: z.string() }),
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          data: z
            .object({
              data: AssetLinkInfo.optional(),
              dbdata: DbDataInfo.optional(),
            })
            .passthrough()
            .optional(),
          success: z.boolean().optional(),
        })
        .passthrough(),
    },
  },
  notices: {
    method: "POST",
    path: "/notices",
    summary: "Create a notice",
    body: z
      .object({
        formdata: z
          .object({
            title: z.string().optional(),
            description: z.string().optional(),
            image: z.string().optional(),
            imagepath: z.string().optional(),
            footer: z.string().optional(),
          })
          .passthrough()
          .optional(),
        categories: z.array(z.string()).optional(),
      })
      .passthrough(),
    contentType: "application/json",
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          data: z.string().optional(),
          success: z.boolean().optional(),
        })
        .passthrough(),
    },
  },
  getDetailsAboutTheNotice: {
    method: "GET",
    path: "/notices/:file",
    summary: "Get details about the notice",
    pathParams: z.object({ file: z.string() }),
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          data: z
            .object({
              data: z
                .object({
                  title: z.string().optional(),
                  description: z.string().optional(),
                  image: z.string().optional(),
                  footer: z.string().optional(),
                })
                .passthrough()
                .optional(),
              dbData: DbDataInfo.optional(),
            })
            .passthrough()
            .optional(),
          success: z.boolean().optional(),
        })
        .passthrough(),
    },
  },
  renamesAnotice: {
    method: "POST",
    path: "/notices/:file",
    summary: "Renames a notice",
    pathParams: z.object({ file: z.string() }),
    body: z.object({ newname: z.string() }).passthrough(),
    contentType: "application/json",
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          data: z.string().optional(),
          success: z.boolean().optional(),
        })
        .passthrough(),
    },
  },
  deletesAnotice: {
    method: "DELETE",
    path: "/notices/:file",
    summary: "Deletes a notice",
    pathParams: z.object({ file: z.string() }),
    body: c.noBody(),
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          data: z.string().optional(),
          success: z.boolean().optional(),
        })
        .passthrough(),
    },
  },
  getplaylists: {
    method: "GET",
    path: "/playlists",
    summary: "Get all the playlists.",
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          success: z.boolean().optional(),
          data: z.array(Playlist).optional(),
        })
        .passthrough(),
    },
  },
  setplaylists: {
    method: "POST",
    path: "/playlists",
    summary: "Create a new playlist",
    body: z.object({ file: z.string() }).passthrough(),
    contentType: "application/json",
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          success: z.boolean().optional(),
          data: z.string().optional(),
        })
        .passthrough(),
    },
  },
  playlistsPlaylistName: {
    method: "GET",
    path: "/playlists/:playlistName",
    summary: "Get information about a specific playlist",
    pathParams: z.object({ playlistName: z.string() }),
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          data: Playlist.optional(),
          success: z.boolean().optional(),
        })
        .passthrough(),
    },
  },
  saveDetailsAboutThePlaylist: {
    method: "POST",
    path: "/playlists/:playlistName",
    summary: "Save details about the playlist",
    pathParams: z.object({ playlistName: z.string() }),
    body: Playlist,
    contentType: "application/json",
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          data: Playlist.optional(),
          success: z.boolean().optional(),
        })
        .passthrough(),
    },
  },
  updateThePlaylist: {
    method: "POST",
    path: "/playlistfiles",
    summary: "Update the asset details to include this playlist",
    body: z
      .object({ playlist: z.string(), assets: z.array(z.string()) })
      .passthrough(),
    contentType: "application/json",
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          success: z.boolean().optional(),
        })
        .passthrough(),
    },
  },
  getplayers: {
    method: "GET",
    path: "/players",
    summary:
      "Get information about all the players specified in the parameters",
    query: z.object({
      group: z.string().optional(),
      groupName: z.string().optional(),
      string: z.string().optional(),
      location: z.string().optional(),
      label: z.string().optional(),
      currentPlaylist: z.string().optional(),
      version: z.string().optional(),
      page: z.number().int().optional(),
      per_page: z.number().int().optional(),
    }),
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          data: z
            .object({
              objects: z.array(PlayerInfo).optional(),
              page: z.number().int().optional(),
              pages: z.number().int().optional(),
              count: z.number().int().optional(),
              currentVersion: z
                .object({
                  version: z.string().optional(),
                  platform_version: z.string().optional(),
                  beta: z.string().optional(),
                })
                .passthrough()
                .optional(),
            })
            .passthrough()
            .optional(),
          success: z.boolean().optional(),
        })
        .passthrough(),
    },
  },
  updateplayers: {
    method: "POST",
    path: "/players",
    summary: "Create a new player",
    body: PlayerInfoWritable,
    contentType: "application/json",
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          data: PlayerInfo.optional(),
          success: z.boolean().optional(),
        })
        .passthrough(),
    },
  },
  playersPlayerId: {
    method: "GET",
    path: "/players/:playerId",
    summary: "Get information about the player",
    pathParams: z.object({ playerId: z.string() }),
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          data: PlayerInfo.optional(),
          success: z.boolean().optional(),
        })
        .passthrough(),
    },
  },
  updateInformationAboutThePlayer: {
    method: "POST",
    path: "/players/:playerId",
    summary: "Update information about the player",
    pathParams: z.object({ playerId: z.string() }),
    body: PlayerInfoWritable,
    contentType: "application/json",
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          data: PlayerInfo.optional(),
          success: z.boolean().optional(),
        })
        .passthrough(),
    },
  },
  removesTheSpecifiedPlayer: {
    method: "DELETE",
    path: "/players/:playerId",
    summary: "Removes the specified player",
    pathParams: z.object({ playerId: z.string() }),
    body: c.noBody(),
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          success: z.boolean().optional(),
        })
        .passthrough(),
    },
  },
  screens: {
    method: "GET",
    path: "/screens",
    summary:
      "Get information about all the players including that of collaborator accounts",
    query: z.object({ onlyInstallation: z.string().optional() }),
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          data: z
            .object({
              objects: z.array(PlayerInfo).optional(),
              page: z.number().int().optional(),
              pages: z.number().int().optional(),
              count: z.number().int().optional(),
              currentVersion: z
                .object({
                  version: z.string().optional(),
                  platform_version: z.string().optional(),
                  beta: z.string().optional(),
                })
                .passthrough()
                .optional(),
            })
            .passthrough()
            .optional(),
          success: z.boolean().optional(),
        })
        .passthrough(),
    },
  },
  pitvPlayerId: {
    method: "POST",
    path: "/pitv/:playerId",
    summary: "Switch off TV attached to player",
    pathParams: z.object({ playerId: z.string() }),
    body: z.object({ status: z.boolean().optional() }).passthrough(),
    contentType: "application/json",
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          success: z.boolean().optional(),
        })
        .passthrough(),
    },
  },
  playlistmediaPlayerIdAction: {
    method: "POST",
    path: "/playlistmedia/:playerId/:action",
    summary: "Playlist media controls",
    pathParams: z.object({
      playerId: z.string(),
      action: z.enum(["pause", "backward", "forward"]),
    }),
    body: c.noBody(),
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          success: z.boolean().optional(),
          data: z
            .object({ isPaused: z.boolean().optional() })
            .passthrough()
            .optional(),
        })
        .passthrough(),
    },
  },
  setplaylistPlayerIdPlaylist: {
    method: "POST",
    path: "/setplaylist/:playerId/:playlist",
    summary: "Play a playlist once",
    pathParams: z.object({ playerId: z.string(), playlist: z.string() }),
    body: c.noBody(),
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          success: z.boolean().optional(),
          data: z
            .object({
              msg: z.string().optional(),
              playlist: z.string().optional(),
            })
            .passthrough()
            .optional(),
        })
        .passthrough(),
    },
  },
  groups: {
    method: "GET",
    path: "/groups",
    summary: "Get information about the specified groups",
    query: z.object({
      string: z.string().optional(),
      all: z.string().optional(),
      page: z.number().int().optional(),
      per_page: z.number().int().optional().default(500),
    }),
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          data: z.array(GroupInfo).optional(),
          success: z.boolean().optional(),
        })
        .passthrough(),
    },
  },
  createAnewGroup: {
    method: "POST",
    path: "/groups",
    summary: "Create a new group",
    body: GroupInfo,
    contentType: "application/json",
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          data: GroupInfo.optional(),
          success: z.boolean().optional(),
        })
        .passthrough(),
    },
  },
  getGroupsGroupId: {
    method: "GET",
    path: "/groups/:groupId",
    summary: "Get information about the group",
    pathParams: z.object({ groupId: z.string() }),
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          data: GroupInfo.optional(),
          success: z.boolean().optional(),
        })
        .passthrough(),
    },
  },
  updateGroupsGroupId: {
    method: "POST",
    path: "/groups/:groupId",
    summary:
      "Update information & settings about the group and deploy/export to USB",
    pathParams: z.object({ groupId: z.string() }),
    body: z
      .object({
        deploy: z.boolean().optional(),
        exportAssets: z.boolean().optional(),
      })
      .passthrough()
      .and(GroupInfo),
    contentType: "application/json",
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          data: GroupInfo.optional(),
          success: z.boolean().optional(),
        })
        .passthrough(),
    },
  },
  deleteGroupsGroupId: {
    method: "DELETE",
    path: "/groups/:groupId",
    summary: "Remove the group",
    pathParams: z.object({ groupId: z.string() }),
    body: c.noBody(),
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          success: z.boolean().optional(),
        })
        .passthrough(),
    },
  },
  getLabels: {
    method: "GET",
    path: "/labels",
    summary: "Get all the categories",
    query: z.object({
      page: z.number().int().optional(),
      per_page: z.number().int().optional(),
      string: z.string().optional(),
      mode: z.enum(["players", "groups", "playlists", "assets"]).optional(),
    }),
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          data: z.array(Label).optional(),
          success: z.boolean().optional(),
        })
        .passthrough(),
    },
  },
  createLabels: {
    method: "POST",
    path: "/labels",
    summary: "Create a new category",
    body: Label,
    contentType: "application/json",
    responses: { 200: Label },
  },
  labelsLabelId: {
    method: "GET",
    path: "/labels/:labelId",
    summary: "Get details of the category by name",
    pathParams: z.object({ labelId: z.string() }),
    responses: { 200: Label },
  },
  updateInformationAboutAcategory: {
    method: "POST",
    path: "/labels/:labelId",
    summary: "Update information about a category",
    pathParams: z.object({ labelId: z.string() }),
    body: Label,
    contentType: "application/json",
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          data: Label.optional(),
          success: z.boolean().optional(),
        })
        .passthrough(),
    },
  },
  deleteLabelsLabelId: {
    method: "DELETE",
    path: "/labels/:labelId",
    summary: "Delete a category",
    pathParams: z.object({ labelId: z.string() }),
    body: c.noBody(),
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          success: z.boolean().optional(),
        })
        .passthrough(),
    },
  },
  usersMe: {
    method: "GET",
    path: "/users/me",
    summary: "Obtain information about the logged in user",
    responses: { 200: UserDetailsOutput, 401: c.noBody() },
  },
  getdownloadauth: {
    method: "GET",
    path: "/downloadauth",
    summary:
      "Obtains the download authorization credentials for the user's installation",
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          data: z
            .object({
              user: z.string().optional(),
              password: z.string().optional(),
            })
            .passthrough()
            .optional(),
          success: z.boolean().optional(),
        })
        .passthrough(),
    },
  },
  setdownloadauth: {
    method: "POST",
    path: "/downloadauth",
    summary:
      "Updates the download authorization credentials for the user's installation",
    body: z
      .object({ user: z.string().optional(), password: z.string().optional() })
      .passthrough(),
    contentType: "application/json",
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          success: z.boolean().optional(),
        })
        .passthrough(),
    },
  },
  installationsettings: {
    method: "GET",
    path: "/installationsettings",
    summary: "Get information about the installation settings of the user",
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          data: UserSettings.and(
            z
              .object({
                installation: z.string().optional(),
                collaboratorRights: z.string().optional(),
                accounts: z.array(z.string()).optional(),
                enabledLanguages: z.array(z.string()).optional(),
              })
              .passthrough(),
          ).optional(),
          success: z.boolean().optional(),
        })
        .passthrough(),
    },
  },
  updateTheInstallationSettingsOfTheUser: {
    method: "POST",
    path: "/installationsettings",
    summary: "Update the installation settings of the user",
    body: UserSettings,
    contentType: "application/json",
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          data: UserSettings.optional(),
          success: z.boolean().optional(),
        })
        .passthrough(),
    },
  },
  licensedetails: {
    method: "GET",
    path: "/licensedetails",
    summary: "Get the license details of the user",
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          data: z
            .object({
              licensesPurchased: z.number().int().optional(),
              licensesUsed: z.number().int().optional(),
              serverLicenses: z.number().int().optional(),
              serverLicensesUsed: z.number().int().optional(),
              storageSpace: z.number().int().optional(),
              serverCredits: z.number().int().optional(),
              freeCredits: z.number().int().optional(),
              nextBilling: z.string().optional(),
              nextCredit: z.string().optional(),
            })
            .passthrough()
            .optional(),
          success: z.boolean().optional(),
        })
        .passthrough(),
    },
  },
  licenselist: {
    method: "GET",
    path: "/licenselist",
    summary: "Get the list of player licenses of the user",
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          data: z
            .array(
              z
                .object({
                  installation: z.string().optional(),
                  licenseText: z.string().optional(),
                  managed: z.boolean().optional(),
                  playerOnlyExists: z.boolean().optional(),
                  disabled: z.boolean().optional(),
                  cpuSerialNumber: z.string().optional(),
                })
                .passthrough(),
            )
            .optional(),
          success: z.boolean().optional(),
        })
        .passthrough(),
    },
  },
  getevents: {
    method: "GET",
    path: "/getevents",
    summary: "Get the list of latest (up to 200) events",
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          data: z
            .array(
              z
                .object({
                  installation: z.string().optional(),
                  type: z.string().optional(),
                  description: z.string().optional(),
                  playerId: z.string().optional(),
                  category: z.string().optional(),
                  ts: z.number().int().optional(),
                })
                .passthrough(),
            )
            .optional(),
          success: z.boolean().optional(),
        })
        .passthrough(),
    },
  },
  playOrStopAplaylist: {
    method: "POST",
    path: "/play/playlists/:file",
    summary: "Play or Stop a playlist",
    pathParams: z.object({ file: z.string() }),
    body: z.union([playlistStart, playlistStop]),
    contentType: "application/json",
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          success: z.boolean().optional(),
        })
        .passthrough(),
    },
  },
  playOrStopAplaylist1: {
    method: "POST",
    path: "/play/files/:action",
    summary: "Play or Stop a playlist",
    query: z.object({ file: z.string() }),
    pathParams: z.object({
      action: z.enum(["play", "stop", "pause", "status"]),
    }),
    body: c.noBody(),
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          success: z.boolean().optional(),
          data: z
            .object({ status: z.string().optional() })
            .passthrough()
            .optional(),
        })
        .passthrough(),
    },
  },
  playlistmediaAction: {
    method: "POST",
    path: "/playlistmedia/:action",
    summary: "Playlist media controls",
    pathParams: z.object({ action: z.enum(["pause", "backward", "forward"]) }),
    body: c.noBody(),
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          success: z.boolean().optional(),
          data: z
            .object({ isPaused: z.boolean().optional() })
            .passthrough()
            .optional(),
        })
        .passthrough(),
    },
  },
  returnThePlayerStatus: {
    method: "GET",
    path: "/status",
    summary: "Return the player status",
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          success: z.boolean().optional(),
          data: z
            .object({
              diskSpaceUsed: z.string().optional(),
              diskSpaceAvailable: z.string().optional(),
              playlistOn: z.boolean().optional(),
              duration: z.string().optional(),
              tvStatus: z.boolean().optional(),
              cecTvStatus: z.boolean().optional(),
              currentPlaylist: z.string().optional(),
              currentPlayingFile: z.string().optional(),
              cpuSerialNumber: z.string().optional(),
              playlistsDeployed: z.array(z.string()).optional(),
            })
            .passthrough()
            .optional(),
        })
        .passthrough(),
    },
  },
  returnThePlayerSettings: {
    method: "GET",
    path: "/settings",
    summary: "Return the player settings",
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          success: z.boolean().optional(),
          data: playerSettings.optional(),
        })
        .passthrough(),
    },
  },
  settingsHostname: {
    method: "POST",
    path: "/settings/hostname",
    summary: "Set the localName and note for the player",
    body: z
      .object({ localName: z.string().optional(), note: z.string().optional() })
      .passthrough(),
    contentType: "application/json",
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          data: playerSettings.optional(),
          success: z.boolean().optional(),
        })
        .passthrough(),
    },
  },
  setTheNetworkSettingsForEthernetInterface: {
    method: "POST",
    path: "/settings/ethernet",
    summary: "Set the Network settings for Ethernet interface",
    body: z
      .object({
        ipsettings: z
          .object({
            mode: z.enum(["DHCP", "Static"]).optional(),
            address: z.string().optional(),
            netmask: z.string().optional(),
            gateway: z.string().optional(),
          })
          .passthrough()
          .optional(),
        dns: Dns.optional(),
      })
      .passthrough(),
    contentType: "application/json",
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          data: playerSettings.optional(),
          success: z.boolean().optional(),
        })
        .passthrough(),
    },
  },
  setTheWifiSettings: {
    method: "POST",
    path: "/settings/wifi",
    summary: "Set the Wifi settings",
    body: z
      .object({
        wifi: z
          .object({
            apmode: z.enum(["NO", "AP"]).optional(),
            open: z.boolean().optional(),
            ssid: z.string().optional(),
            pass: z.string().optional(),
          })
          .passthrough()
          .optional(),
      })
      .passthrough(),
    contentType: "application/json",
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          data: playerSettings.optional(),
          success: z.boolean().optional(),
        })
        .passthrough(),
    },
  },
  settingsOverscan: {
    method: "POST",
    path: "/settings/overscan",
    summary: "Set the overscan settings for display adjustment",
    body: z
      .object({
        overscan: z
          .object({
            disable_overscan: z.boolean().optional(),
            horizontal: z.number().int().optional(),
            vertical: z.number().int().optional(),
          })
          .passthrough()
          .optional(),
      })
      .passthrough(),
    contentType: "application/json",
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          data: playerSettings.optional(),
          success: z.boolean().optional(),
        })
        .passthrough(),
    },
  },
  settingsOrienetation: {
    method: "POST",
    path: "/settings/orienetation",
    summary: "Set the hardware orienetation for the display",
    body: z
      .object({
        resolution: z.enum(["auto", "1080p", "720p", "PAL", "NTSC"]).optional(),
        orientation: z
          .enum(["landscape", "portrait", "portrait270"])
          .optional(),
      })
      .passthrough(),
    contentType: "application/json",
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          data: playerSettings.optional(),
          success: z.boolean().optional(),
        })
        .passthrough(),
    },
  },
  settingsServername: {
    method: "POST",
    path: "/settings/servername",
    summary: "Set the server name for the player",
    body: z
      .object({
        server: z
          .object({
            config: z.string().optional(),
            media: z.string().optional(),
          })
          .passthrough()
          .optional(),
      })
      .passthrough(),
    contentType: "application/json",
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          data: playerSettings.optional(),
          success: z.boolean().optional(),
        })
        .passthrough(),
    },
  },
  setTheUserNameAndPasswordForWebuiAndDownload: {
    method: "POST",
    path: "/settings/user",
    summary: "Set the user name and password for webUI and download",
    body: z
      .object({
        user: z
          .object({
            name: z.string().optional(),
            newpasswd: z.string().optional(),
          })
          .passthrough()
          .optional(),
      })
      .passthrough(),
    contentType: "application/json",
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          data: playerSettings.optional(),
          success: z.boolean().optional(),
        })
        .passthrough(),
    },
  },
  settingsSleep: {
    method: "POST",
    path: "/settings/sleep",
    summary: "Set the on and off time for TV",
    body: z.object({ sleep: Sleep.optional() }).passthrough(),
    contentType: "application/json",
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          data: playerSettings.optional(),
          success: z.boolean().optional(),
        })
        .passthrough(),
    },
  },
  settingsOmxVolume: {
    method: "POST",
    path: "/settings/omxVolume",
    summary: "Set the overscan settings for display adjustment1",
    body: z.object({ omxVolume: z.number().int().optional() }).passthrough(),
    contentType: "application/json",
    responses: { 200: c.noBody() },
  },
  factoryResetTheSettings: {
    method: "POST",
    path: "/settings/reset",
    summary: "Factory reset the settings",
    body: c.noBody(),
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          success: z.boolean().optional(),
        })
        .passthrough(),
    },
  },
  returnsTheAvailableWifiAccessPoints: {
    method: "GET",
    path: "/settings/wifiscan",
    summary: "Returns the available wifi access points",
    responses: {
      200: z
        .object({
          stat_message: z.string().optional(),
          data: z.array(z.string()).optional(),
          success: z.boolean().optional(),
        })
        .passthrough(),
    },
  },
})
