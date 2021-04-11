import { CommandoClient, Command, CommandMessage } from "discord.js-commando";
import axios from "axios";
import { steamPlayerSummaries } from "../../steamapi/SteamAPIs";
import { steamKeyApiId } from "../../steamapi/SteamAPIKey";

module.exports = class GetPlayerProfile extends Command {
    constructor(bot: CommandoClient) {
        super(bot, {
            name: 'profile',
            aliases: ['sdf'],
            group: 'bot',
            memberName: 'profile',
            description: 'shows you information about me.'
        });
    }

    async run(msg: CommandMessage, args) {
        const steamid = msg.message.content.replace("$profile ", "");

        const response = axios({
            method: "GET",
            url: `${steamPlayerSummaries}?key=${steamKeyApiId}&steamids=${steamid}`
        }).then(response => {
            const playerProfile: GetPlayerProfileAPI = response.data.response.players[0];
            console.log(playerProfile.profileurl);

            return playerProfile.profileurl;
        });
     
        return response.then(res => {
            return msg.channel.send(res);
        }).catch(err => {
            return msg.channel.send("Invalid SteamID");
        });
    }
}
