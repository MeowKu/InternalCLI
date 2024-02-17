const Internal = require('./Manager/Manager.js');
const internal = new Internal();

const SetupManager = require("./Manager/SetupCLI.js");
const Setup = new SetupManager();

const { Client, RichPresence, CustomStatus, SpotifyRPC } = require('discord.js-selfbot-v13');
const client = new Client();

const Config = require("./Settings/config.json");
const RPCSettings = require("./Settings/settingRPC.json");
const SpotifyRPCsettings = require("./Settings/SpotifyRPC.json")

async function RPC1() {

  const getExtendURL = await RichPresence.getExternal(
    client, 
    RPCSettings.ApplicationID, 
    RPCSettings.ImageURL
  );
  
  const status = new RichPresence(client)
    .setApplicationId(RPCSettings.ApplicationID)
    .setType(RPCSettings.RPC_Type)
    .setURL(RPCSettings.RPC_URL) 
    .setState(RPCSettings.RPC_State)
    .setName(RPCSettings.RPC_Name)  
    .setDetails(RPCSettings.RPC_Details)  
    
  if (RPCSettings.useParty == true) {
    status.setParty({
      max: 8,
      current: 1   
    })
    .setStartTimestamp(Date.now()) 
  }
   
  status
    .setAssetsLargeImage(getExtendURL[0].external_asset_path) 
    .setAssetsLargeText('Idle')  
    .setAssetsSmallImage('373370493127884800')
    .setAssetsSmallText('click the circles')
  if (RPCSettings.useParty == true) {
    status.addButton(RPCSettings.ButtonName, RPCSettings.ButtonURL);
  }

  client.user.setPresence({
    activities: [status] 
  });

}

async function RPC2() {
    const custom = new CustomStatus(client).setEmoji('😋').setState('yum');
    client.user.setPresence({ activities: [custom] });
}

async function RPC3() {
    const spotify = new SpotifyRPC(client)
    .setAssetsLargeImage(SpotifyRPCsettings.LargeImg) // Image ID
    .setAssetsSmallImage(SpotifyRPCsettings.LargeText) // Image ID
    .setAssetsLargeText(SpotifyRPCsettings.SmallImg) // Album Name
    .setState(SpotifyRPCsettings.State) // Artists
    .setDetails(SpotifyRPCsettings.Details) // Song name
    .setStartTimestamp(Date.now())
    .setEndTimestamp(Date.now() + 1_000 * (2 * 60 + 56)) // Song length = 2m56s
    .setSongId(SpotifyRPCsettings.songID) // Song ID
    .setAlbumId(SpotifyRPCsettings.AlbumID) // Album ID
    .setArtistIds(SpotifyRPCsettings.ArtistID); // Artist IDs
    client.user.setPresence({ activities: [spotify] });
}

client.on('ready', async () => {
    internal.Output(`${client.user.username} is ready!`, "Info");
    const choice = Config.RPC_Choice;
    if (choice === 1) RPC1(); else if (choice === 2) RPC2(); else if (choice === 3) RPC3(); else internal.Output("No RPC Set.", "Info");

})

Setup.Checker();

client.login('NTkxODM3MDk1OTU0MzUwMDky.G5LZCw.SJzXkpBHf7t4Wrfj69wyCTBNNwwhSH4KnzK0P4');