const botconfig = require("./botconfig.json");
const Discord   = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});
//=====================================INITIALIZING=============================
bot.on("ready", async()=>{
	console.log(`${bot.user.username} is online.`);
	bot.user.setActivity("Type ',help'");			//Text below the bot's name
});
//====================================DATABASE==================================
const mysql = require('mysql');                     //Linking mySQL
const con = mysql.createConnection({                //creating new connection named con
  		host     : 'HOSTNAME',
  		user     : 'USERNAME',
  		password : 'PASSWORD',
  		database : 'DBNAME',
  		port     : '3306'
});
con.connect(error => {
	if(error) throw error;
	console.log("Connection to database successful!");
});
//=====================================MAIN=====================================
bot.on("message", async message =>{
	if(message.author.bot) return;				             //ignore if message is sent  by a bot
	if(message.channel.type === "dm") return;        	 //ignore if message is sent in dm

	let prefix = botconfig.prefix;				            //getting the prefix and storing it in prefix variable
	let messageArray = message.content.split(" ");    //Splitting the message into array whenever space is encountered
	let cmd = messageArray[0];						            //first word of message is stored as command
	let arg = messageArray.slice(1);				          //second word as first argument
//-------------------------------HELP-------------------------------------------
	if(cmd === `${prefix}help`)                       //command to show other supported commands
	{
    let icon = bot.user.displayAvatarURL;
    let pan1 = new Discord.RichEmbed()              //creating embed, card style message
		.setTitle("Available Commands :")								//Title(bold)
		.setColor("#E59400")														//color of side vertical bar of message
		.setThumbnail(icon)															//Small icon in upper right corner of message
		.addField(",lrp [player_name] :","Shows statistics of a player.")
		.addField(",highscore [highscore-name] :","Shows the list of players with highest scores.")
		.addField(",status :","Shows status of SA-MP server.")
		.addField(",turfs :","Shows information about the turfs.")
    .addField(",gangs :","Shows the list of official gangs.")
    .addField(",factions :","Shows the list of factions.")
		.setFooter("Lawless Roleplay Discord Bot");
		return message.channel.send(pan1);
  }
//-------------------------STATUS-----------------------------------------------
  if(cmd === `${prefix}status`){
    return message.channel.send({file: "http://www.game-state.com/217.182.36.95:7777/160x270_FFFFFF_575757_.png"}); //change the url according to ur server, get the url from game-state.com
  }
//-------------------------HIGHSCORE--------------------------------------------
  if(cmd === `${prefix}highscore`){
    if(arg == 1 || arg.toString().toLowerCase() === "wealth"){
      con.query('SELECT pname,money FROM users ORDER BY money DESC',(err,rows)=>{																		//selecting name and money from users table and arranging them in descending order
    		if(err) throw err;
        let icon = bot.user.displayAvatarURL;
        let hs = new Discord.RichEmbed()
        .setTitle("Most Money :")
        .setThumbnail(icon)
        .setColor("#E59400")
        .addField("1. "+rows[0].pname+" : $"+rows[0].money.toString()+"\n2. "+rows[1].pname+" : $"+rows[1].money.toString()+"\n3. "+rows[2].pname+" : $"+rows[2].money.toString()+"\n4. "+rows[3].pname+" : $"+rows[3].money.toString()+"\n5. "+rows[4].pname+" : $"+rows[4].money.toString()+"\n6. "+rows[5].pname+" : $"+rows[5].money.toString()+"\n7. "+rows[6].pname+" : $"+rows[6].money.toString()+"\n8. "+rows[7].pname+" : $"+rows[7].money.toString()+"\n9. "+rows[8].pname+" : $"+rows[8].money.toString()+"\n10. "+rows[9].pname+" : $"+rows[9].money.toString(),"Love the server? Donate to keep the server alive.")
        .setFooter("Lawless Roleplay Discord Bot");
        return message.channel.send(hs);
      });
    }
		else if(arg == 2 || arg.toString().toLowerCase() === "hours"){
      con.query('SELECT pname,phours FROM users ORDER BY phours DESC',(err,rows)=>{																		//selecting name and money from users table and arranging them in descending order
    		if(err) throw err;
        let icon = bot.user.displayAvatarURL;
        let hs = new Discord.RichEmbed()
        .setTitle("Most Playing Hours :")
        .setThumbnail(icon)
        .setColor("#E59400")
        .addField("1. "+rows[0].pname+" : "+rows[0].phours.toString()+"\n2. "+rows[1].pname+" : "+rows[1].phours.toString()+"\n3. "+rows[2].pname+" : "+rows[2].phours.toString()+"\n4. "+rows[3].pname+" : "+rows[3].phours.toString()+"\n5. "+rows[4].pname+" : "+rows[4].phours.toString()+"\n6. "+rows[5].pname+" : "+rows[5].phours.toString()+"\n7. "+rows[6].pname+" : "+rows[6].phours.toString()+"\n8. "+rows[7].pname+" : "+rows[7].phours.toString()+"\n9. "+rows[8].pname+" : "+rows[8].phours.toString()+"\n10. "+rows[9].pname+" : "+rows[9].phours.toString(),"Love the server? Donate to keep the server alive.")
        .setFooter("Lawless Roleplay Discord Bot");
        return message.channel.send(hs);
      });
    }
		else if(arg == 3 || arg.toString().toLowerCase() === "detective"){
      con.query('SELECT pname,pfinds FROM users ORDER BY pfinds DESC',(err,rows)=>{																		//selecting name and money from users table and arranging them in descending order
    		if(err) throw err;
        let icon = bot.user.displayAvatarURL;
        let hs = new Discord.RichEmbed()
        .setTitle("Most Finds :")
        .setThumbnail(icon)
        .setColor("#E59400")
        .addField("1. "+rows[0].pname+" : "+rows[0].pfinds.toString()+"\n2. "+rows[1].pname+" : "+rows[1].pfinds.toString()+"\n3. "+rows[2].pname+" : "+rows[2].pfinds.toString()+"\n4. "+rows[3].pname+" : "+rows[3].pfinds.toString()+"\n5. "+rows[4].pname+" : "+rows[4].pfinds.toString()+"\n6. "+rows[5].pname+" : "+rows[5].pfinds.toString()+"\n7. "+rows[6].pname+" : "+rows[6].pfinds.toString()+"\n8. "+rows[7].pname+" : "+rows[7].pfinds.toString()+"\n9. "+rows[8].pname+" : "+rows[8].pfinds.toString()+"\n10. "+rows[9].pname+" : "+rows[9].pfinds.toString(),"Love the server? Donate to keep the server alive.")
        .setFooter("Lawless Roleplay Discord Bot");
        return message.channel.send(hs);
      });
    }
		else if(arg == 4 || arg.toString().toLowerCase() === "fisherman"){
      con.query('SELECT pname,pfisherman FROM users ORDER BY pfisherman DESC',(err,rows)=>{																		//selecting name and money from users table and arranging them in descending order
    		if(err) throw err;
        let icon = bot.user.displayAvatarURL;
        let hs = new Discord.RichEmbed()
        .setTitle("Most Fishes :")
        .setThumbnail(icon)
        .setColor("#E59400")
        .addField("1. "+rows[0].pname+" : "+rows[0].pfisherman.toString()+"\n2. "+rows[1].pname+" : "+rows[1].pfisherman.toString()+"\n3. "+rows[2].pname+" : "+rows[2].pfisherman.toString()+"\n4. "+rows[3].pname+" : "+rows[3].pfisherman.toString()+"\n5. "+rows[4].pname+" : "+rows[4].pfisherman.toString()+"\n6. "+rows[5].pname+" : "+rows[5].pfisherman.toString()+"\n7. "+rows[6].pname+" : "+rows[6].pfisherman.toString()+"\n8. "+rows[7].pname+" : "+rows[7].pfisherman.toString()+"\n9. "+rows[8].pname+" : "+rows[8].pfisherman.toString()+"\n10. "+rows[9].pname+" : "+rows[9].pfisherman.toString(),"Love the server? Donate to keep the server alive.")
        .setFooter("Lawless Roleplay Discord Bot");
        return message.channel.send(hs);
      });
    }
		else if(arg == 5 || arg.toString().toLowerCase() === "lawyer"){
      con.query('SELECT pname,plawyer FROM users ORDER BY plawyer DESC',(err,rows)=>{																		//selecting name and money from users table and arranging them in descending order
    		if(err) throw err;
        let icon = bot.user.displayAvatarURL;
        let hs = new Discord.RichEmbed()
        .setTitle("Most defends :")
        .setThumbnail(icon)
        .setColor("#E59400")
        .addField("1. "+rows[0].pname+" : "+rows[0].plawyer.toString()+"\n2. "+rows[1].pname+" : "+rows[1].plawyer.toString()+"\n3. "+rows[2].pname+" : "+rows[2].plawyer.toString()+"\n4. "+rows[3].pname+" : "+rows[3].plawyer.toString()+"\n5. "+rows[4].pname+" : "+rows[4].plawyer.toString()+"\n6. "+rows[5].pname+" : "+rows[5].plawyer.toString()+"\n7. "+rows[6].pname+" : "+rows[6].plawyer.toString()+"\n8. "+rows[7].pname+" : "+rows[7].plawyer.toString()+"\n9. "+rows[8].pname+" : "+rows[8].plawyer.toString()+"\n10. "+rows[9].pname+" : "+rows[9].plawyer.toString(),"Love the server? Donate to keep the server alive.")
        .setFooter("Lawless Roleplay Discord Bot");
        return message.channel.send(hs);
      });
    }
		else if(arg == 6 || arg.toString().toLowerCase() === "whore"){
      con.query('SELECT pname,pwhore FROM users ORDER BY pwhore DESC',(err,rows)=>{																		//selecting name and money from users table and arranging them in descending order
    		if(err) throw err;
        let icon = bot.user.displayAvatarURL;
        let hs = new Discord.RichEmbed()
        .setTitle("Top Whores :")
        .setThumbnail(icon)
        .setColor("#E59400")
        .addField("1. "+rows[0].pname+" : "+rows[0].pwhore.toString()+"\n2. "+rows[1].pname+" : "+rows[1].pwhore.toString()+"\n3. "+rows[2].pname+" : "+rows[2].pwhore.toString()+"\n4. "+rows[3].pname+" : "+rows[3].pwhore.toString()+"\n5. "+rows[4].pname+" : "+rows[4].pwhore.toString()+"\n6. "+rows[5].pname+" : "+rows[5].pwhore.toString()+"\n7. "+rows[6].pname+" : "+rows[6].pwhore.toString()+"\n8. "+rows[7].pname+" : "+rows[7].pwhore.toString()+"\n9. "+rows[8].pname+" : "+rows[8].pwhore.toString()+"\n10. "+rows[9].pname+" : "+rows[9].pwhore.toString(),"Love the server? Donate to keep the server alive.")
        .setFooter("Lawless Roleplay Discord Bot");
        return message.channel.send(hs);
      });
    }
		else if(arg == 7 || arg.toString().toLowerCase() === "dealer"){
      con.query('SELECT pname,pdealer FROM users ORDER BY pdealer DESC',(err,rows)=>{																		//selecting name and money from users table and arranging them in descending order
    		if(err) throw err;
        let icon = bot.user.displayAvatarURL;
        let hs = new Discord.RichEmbed()
        .setTitle("Top Drug Dealers :")
        .setThumbnail(icon)
        .setColor("#E59400")
        .addField("1. "+rows[0].pname+" : "+rows[0].pdealer.toString()+"\n2. "+rows[1].pname+" : "+rows[1].pdealer.toString()+"\n3. "+rows[2].pname+" : "+rows[2].pdealer.toString()+"\n4. "+rows[3].pname+" : "+rows[3].pdealer.toString()+"\n5. "+rows[4].pname+" : "+rows[4].pdealer.toString()+"\n6. "+rows[5].pname+" : "+rows[5].pdealer.toString()+"\n7. "+rows[6].pname+" : "+rows[6].pdealer.toString()+"\n8. "+rows[7].pname+" : "+rows[7].pdealer.toString()+"\n9. "+rows[8].pname+" : "+rows[8].pdealer.toString()+"\n10. "+rows[9].pname+" : "+rows[9].pdealer.toString(),"Love the server? Donate to keep the server alive.")
        .setFooter("Lawless Roleplay Discord Bot");
        return message.channel.send(hs);
      });
    }
		else if(arg == 8 || arg.toString().toLowerCase() === "smuggler"){
      con.query('SELECT pname,psmuggle FROM users ORDER BY psmuggler DESC',(err,rows)=>{																		//selecting name and money from users table and arranging them in descending order
    		if(err) throw err;
        let icon = bot.user.displayAvatarURL;
        let hs = new Discord.RichEmbed()
        .setTitle("Top Drug Smugglers :")
        .setThumbnail(icon)
        .setColor("#E59400")
        .addField("1. "+rows[0].pname+" : "+rows[0].psmuggler.toString()+"\n2. "+rows[1].pname+" : "+rows[1].psmuggler.toString()+"\n3. "+rows[2].pname+" : "+rows[2].psmuggler.toString()+"\n4. "+rows[3].pname+" : "+rows[3].psmuggler.toString()+"\n5. "+rows[4].pname+" : "+rows[4].psmuggler.toString()+"\n6. "+rows[5].pname+" : "+rows[5].psmuggler.toString()+"\n7. "+rows[6].pname+" : "+rows[6].psmuggler.toString()+"\n8. "+rows[7].pname+" : "+rows[7].psmuggler.toString()+"\n9. "+rows[8].pname+" : "+rows[8].psmuggler.toString()+"\n10. "+rows[9].pname+" : "+rows[9].psmuggler.toString(),"Love the server? Donate to keep the server alive.")
        .setFooter("Lawless Roleplay Discord Bot");
        return message.channel.send(hs);
      });
    }
		else if(arg == 9 || arg.toString().toLowerCase() === "arms"){
      con.query('SELECT pname,parms FROM users ORDER BY parms DESC',(err,rows)=>{																		//selecting name and money from users table and arranging them in descending order
    		if(err) throw err;
        let icon = bot.user.displayAvatarURL;
        let hs = new Discord.RichEmbed()
        .setTitle("Top Drug Smugglers :")
        .setThumbnail(icon)
        .setColor("#E59400")
        .addField("1. "+rows[0].pname+" : "+rows[0].parms.toString()+"\n2. "+rows[1].pname+" : "+rows[1].parms.toString()+"\n3. "+rows[2].pname+" : "+rows[2].parms.toString()+"\n4. "+rows[3].pname+" : "+rows[3].parms.toString()+"\n5. "+rows[4].pname+" : "+rows[4].parms.toString()+"\n6. "+rows[5].pname+" : "+rows[5].parms.toString()+"\n7. "+rows[6].pname+" : "+rows[6].parms.toString()+"\n8. "+rows[7].pname+" : "+rows[7].parms.toString()+"\n9. "+rows[8].pname+" : "+rows[8].parms.toString()+"\n10. "+rows[9].pname+" : "+rows[9].parms.toString(),"Love the server? Donate to keep the server alive.")
        .setFooter("Lawless Roleplay Discord Bot");
        return message.channel.send(hs);
      });
    }
		//====================JUST COPY THE ABOVE IF ELSE===========================
    else {	//list of available highscores
      let icon = bot.user.displayAvatarURL;
      let hs = new Discord.RichEmbed()
      .setTitle("Available Highscores Names:")
      .setThumbnail(icon)
      .setColor("#E59400")
      .addField("1.💰 Wealth\n2.⏰ Playing Hours\n3.🔍 Detective\n4.🐟 Fisherman\n5.📖 Lawyer\n6.💋 Whore\n7.💊 Drug Dealer\n8.🛵 Drug Smuggler\n9.🔫 Arms Dealer\n10.🛠 Mechanic\n11.🚚 Trucker\n12.🚙 Car Jacker\n13.🎩 Robber\n14.👷 Forklifter\n15.👈 Referral\n16.💸 Charity","Either type the number or the name of the highscore.")
      .setFooter("Lawless Roleplay Discord Bot");
      return message.channel.send(hs);
    }
  }
//----------------------------------TURFS---------------------------------------
if(cmd === `${prefix}turfs`){
	con.query('SELECT turfname,capturedby,vulnerabletime FROM turfs ORDER BY vulnerabletime DESC',(err,rows)=>{																		//selecting name and money from users table and arranging them in descending order
		if(err) throw err;
		let icon = bot.user.displayAvatarURL;
		let hs = new Discord.RichEmbed()
		.setTitle("Turfs List :")
		.setThumbnail(icon)
		.setColor("#E59400")
		.addField("1. "+rows[0].turfname+" | Owned by: "+rows[0].capturedby+" | Time: "+rows[0].vulnerabletime.toString()+" hour(s)\n"+"2. "+rows[1].turfname+" | Owned by: "+rows[1].capturedby+" | Time: "+rows[1].vulnerabletime.toString()+" hour(s)\n"+"3. "+rows[2].turfname+" | Owned by: "+rows[2].capturedby+" | Time: "+rows[2].vulnerabletime.toString()+" hour(s)\n","Love the server? Donate to keep the server alive.") //Just paste "1. "+rows[0].turfname+" | Owned by: "+rows[0].capturedby+" | Time: "+rows[0].vulnerabletime.toString()+" hour(s)\n" to add more, make sure to change the fields accordingly
		.setFooter("Lawless Roleplay Discord Bot");
		return message.channel.send(hs);
	});
}
//--------------------------------------STATS-----------------------------------
if(cmd === `${prefix}lrp`){
  con.query('SELECT pname,phours,pgang,pfaction,page,pphone from users WHERE pname = '+arg,(err,rows)=>{
    if(err) throw err;
    let icon = bot.user.displayAvatarURL;
    let hs = new Discord.RichEmbed()
    .setTitle(rows[0].pname+"'s Stats")
    .setThumbnail(icon)
    .setColor("#E59400")
    .addField("Playing Hours: "+rows[0].phours.toString()+"\n Organisation: "+rows[0].pgang+rows[0].pfaction+"\n Age: "+rows[0].page.toString()+"\n Phone Number: "+rows[0].pphone.toString())
    return message.channel.send(hs);
  //If your server supports Dyanmic Signatures, uncomment the following
  //return message.channel.send({file: "DYNAMIC_SIG_LINK"}); //make sure to format the link according to 'arg' value
  });
}
//-------------------------------------GANGS------------------------------------
if(cmd === `${prefix}gangs`){
  con.query('SELECT * FROM gangs',(err,rows)=>{
    if(err) throw err;
    let icon = bot.user.displayAvatarURL;
    let hs = new Discord.RichEmbed()
    .setTitle("Official Gangs")
    .setThumbnail(icon)
    .setColor("#E59400")
    .addField("1. "+rows[0].gname+" | Leader: "+rows[0].gleader+" | Members: "+rows[0].gmembers.toString()+"\n2. "+rows[1].gname+" | Leader: "+rows[1].gleader+" | Members: "+rows[1].gmembers.toString()) //add more if you need
    return message.channel.send(hs);
  });
}
//----------------------------------FACTIONS-------------------------------------
//Almost identical to GANGS section, just replace gname, gleader, gmembers with faction alternatives 

});
bot.login(botconfig.token);
//=====================================END======================================
