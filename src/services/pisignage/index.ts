export { PiSignageClient } from "./client.js"

// /**
//  * Get group info by id
//  * @param {string} groupId
//  */
// const getGroupInfo = async (groupId) => {
//   const info = await pisignage.getGroupsGroupId({
//     params: { groupId },
//   })

//   if (info.status !== 200) throw new Error(String(info.body))
//   if (!info.body.data) throw new Error("Cannot get group info 'data'")

//   return info.body.data
// }
