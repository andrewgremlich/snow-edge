!function(){"use strict";var t=document.querySelector("output");function a(a){var e=document.createTextNode(a),r=document.createElement("pre");r.appendChild(e),t.appendChild(r),r.scrollIntoView()}function e(t,a){this.lives=t.lives,this.xGameStart=t.xPlayerStart,this.yGameStart=t.yPlayerStart,this.xPos=t.xPlayerStart,this.yPos=t.yPlayerStart,this.dead=t.dead,this.dangersNear=0,this.gameObj=a,this.visitedLocations=[[t.xPlayerStart,t.yPlayerStart]]}e.prototype.updateVisitedLocations=function(){this.visitedLocations.push([this.xPos,this.yPos]),this.gameObj.genMap()},e.prototype.move=function(t,e){var r=e-1,n=t-1,i=Math.abs(r-this.xPos),o=Math.abs(n-this.yPos);i>1||o>1?a("✋ Can not move farther than one square"):i>=1||o>=1?(this.xPos=r,this.yPos=n,this.updateVisitedLocations(),this.inDanger()):a("😕 You have inputed invalid coordinates")},e.prototype.inDanger=function(){this.dangersNear=0;var t=!0,e=!1,r=void 0;try{for(var n,i=this.gameObj.dangers[Symbol.iterator]();!(t=(n=i.next()).done);t=!0){var o=n.value;o.dangerCoor[0]===this.xPos&&o.dangerCoor[1]===this.yPos&&(1===this.lives?this.die(o.danger):(this.lives--,this.xPos=this.xGameStart,this.yPos=this.yGameStart,a("💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀"),a(o.danger+" You dead bro! 💔"),a("Lost one life. Restarting at "+(this.xGameStart+1)+", "+(this.yGameStart+1)),a("You have "+this.lives+" "+(1===this.lives?"life":"lives")+" left."),a("💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀"),this.heartsLeft()));var s=o.dangerCoor[0],l=o.dangerCoor[1];s-1===this.xPos&&l-1===this.yPos&&this.dangersNear++,s-0===this.xPos&&l-1===this.yPos&&this.dangersNear++,s-1===this.xPos&&l+1===this.yPos&&this.dangersNear++,s-1===this.xPos&&l+0===this.yPos&&this.dangersNear++,s+1===this.xPos&&l+1===this.yPos&&this.dangersNear++,s+0===this.xPos&&l+1===this.yPos&&this.dangersNear++,s+1===this.xPos&&l-1===this.yPos&&this.dangersNear++,s+1===this.xPos&&l-0===this.yPos&&this.dangersNear++}}catch(t){e=!0,r=t}finally{try{!t&&i.return&&i.return()}finally{if(e)throw r}}},e.prototype.heartsLeft=function(){for(var t="",e=0;e<this.lives;e++)t+="💜";a(t),this.gameObj.genMap()},e.prototype.die=function(t){this.dead=!0,this.dead&&(a(t+" You dead bro!"),a("Will restart on "+window.playGame.difficulty+" difficulty"),o(window.playGame.difficulty))};var r=["You fell off a cliff. Yahoooooooooo! 👍👊","🐺🐺🐺 A pack of wolves got you.  You are not Mowgli? 🐺🐺🐺","❄️ A blizzard trapped you.  Not from Dairy Queen. ❄️","🐻 A bear mauled you.  No safety there!","👣 You saw bigfoot???","🐧 A penguin speared you with its beak.","👅 A moose licked and left you in its tracks.","A reindeer ran over you.","✉️ An email soared out of the sky and smacked you in the head.","Your pizza 🍕 froze ❄️.  You have nothing to eat!","Deadpool popped out from behind a tree and stabbed you. ⚔","You got sick with a cold. 🤒"];function n(t){this.mapDisplay=[],this.player=new e({yPlayerStart:t.yPlayerStart,xPlayerStart:t.xPlayerStart,lives:t.lives,dead:!1},this),this.difficulty=t.difficulty,this.yLength=t.yLength,this.xLength=t.xLength,this.dangers=[],this.suspectedDangers=[],this.yGoal=t.yGoal,this.xGoal=t.xGoal,this.numDangers=t.numDangers}n.prototype.genMap=function(){var t=this.player.visitedLocations;this.mapDisplay=[];for(var e=0;e<this.yLength;e++){this.mapDisplay.push([]);for(var r=0;r<this.xLength;r++)this.mapDisplay[e].push(".")}var n=!0,i=!1,s=void 0;try{for(var l,h=this.suspectedDangers[Symbol.iterator]();!(n=(l=h.next()).done);n=!0){var y=l.value;this.mapDisplay[y[1]-1][y[0]-1]="?"}}catch(t){i=!0,s=t}finally{try{!n&&h.return&&h.return()}finally{if(i)throw s}}var d=!0,u=!1,c=void 0;try{for(var f,p=t[Symbol.iterator]();!(d=(f=p.next()).done);d=!0){var g=f.value,m=g[0],v=g[1],x=0;this.mapDisplay[m][v]="*";var P=!0,w=!1,G=void 0;try{for(var S,b=this.dangers[Symbol.iterator]();!(P=(S=b.next()).done);P=!0){var D=S.value.dangerCoor,L=m,M=v;L+1===D[0]&&M+1===D[1]&&x++,L+1===D[0]&&M-1===D[1]&&x++,L+1===D[0]&&M+0===D[1]&&x++,L+0===D[0]&&M+1===D[1]&&x++,L-1===D[0]&&M+1===D[1]&&x++,L-1===D[0]&&M+0===D[1]&&x++,L-1===D[0]&&M-1===D[1]&&x++,L-0===D[0]&&M-1===D[1]&&x++,L===D[0]&&M===D[1]&&(this.mapDisplay[D[0]][D[1]]="X")}}catch(t){w=!0,G=t}finally{try{!P&&b.return&&b.return()}finally{if(w)throw G}}x>0&&"X"!==this.mapDisplay[m][v]&&(this.mapDisplay[m][v]=x)}}catch(t){u=!0,c=t}finally{try{!d&&p.return&&p.return()}finally{if(u)throw c}}this.mapDisplay[this.player.xPos][this.player.yPos]="&",this.mapDisplay[this.xGoal][this.yGoal]="!!",this.player.xPos===this.xGoal&&this.player.yPos===this.yGoal&&(a("🔥🔥🔥🔥🔥 You won the game!  🔥🔥🔥🔥🔥🔥"),a("😄😄😄😄😄😄😄😄😄😄"),a("Will restart on "+window.playGame.difficulty+" difficulty"),o(window.playGame.difficulty))},n.prototype.genDangers=function(){for(var t=0,a=[];t<=this.numDangers;){var e=Math.floor(Math.random()*this.yLength)+1,n=Math.floor(Math.random()*this.xLength)+1,i=Math.floor(Math.random()*r.length),o=!1,s=!0,l=!1,h=void 0;try{for(var y,d=a[Symbol.iterator]();!(s=(y=d.next()).done);s=!0){var u=y.value;u[0]===e&&u[0]===n&&(o=!0)}}catch(t){l=!0,h=t}finally{try{!s&&d.return&&d.return()}finally{if(l)throw h}}o||(this.dangers.push({dangerCoor:[e,n],danger:r[i]}),t++)}this.player.inDanger()};var i={easy:{difficulty:"easy",yLength:10,xLength:10,yPlayerStart:0,xPlayerStart:0,yGoal:8,xGoal:8,numDangers:12,lives:5},medium:{difficulty:"medium",yLength:12,xLength:12,yPlayerStart:1,xPlayerStart:1,yGoal:10,xGoal:10,numDangers:30,lives:3},hard:{difficulty:"hard",yLength:14,xLength:14,yPlayerStart:2,xPlayerStart:2,yGoal:12,xGoal:12,numDangers:70,lives:1},ludicrous:{difficulty:"ludicrous",yLength:14,xLength:14,yPlayerStart:2,xPlayerStart:2,yGoal:12,xGoal:12,numDangers:70,lives:1}};function o(t){var a=new n(i[t]);window.playGame=a,playGame.genMap(),playGame.genDangers()}var s="\nAvailable commands.\n***Basic Commands\n[m]    Show Map\n[h]    Hike Mountain (example command 'h 2 2')\n[s]    Mark suspected danger\n[r]    Remind nearby dangers\n[p]    Show current position\n\n***Help Commands\n[g]    Show guide\n[c]    Show commands again\n[l]    Show Legend\n[d]    Change difficulty\n";function l(t){var e=/\d+/g,r=t.match(e),n=+r[1],i=+r[0];return e.test(t)&&2===r.length?i<1||n<1||i>playGame.xLength||n>playGame.yLength?(a("😕"),a("Must be valid x and y coordinates"),a("Must input coordinates (1,1) to ("+playGame.xLength+","+playGame.yLength+")"),!1):[i,n]:(a("Invalid coordinates"),a("Must be two numbers"),!1)}var h={p:function(){var t=window.playGame.player;a("Your current position is ("+(t.yPos+1)+","+(t.xPos+1)+")")},d:function(t){var e=t.split(" ");2===e.length&&["easy","medium","hard","ludicrous"].includes(e[1])?(o(e[1]),a("Game difficulty changed!")):a("Invalid command.")},r:function(){var t=playGame.player,e=1===t.dangersNear?"is":"are",r=1===t.dangersNear?"danger":"dangers",n=0===t.dangersNear?"":"Be careful!";a("There "+e+" "+t.dangersNear+" "+r+" near by.  "+n)},s:function(t){a("Marking suspected danger on map...");var e=l(t);e&&playGame.suspectedDangers.push(e),this.m()},g:function(){a("\n\n  /*********************************************/\n        Welcome to SnowEdge!\n  /*********************************************/\n\n  You are a daring explorer.  You decided to scale\n  Mount Denali in a snow storm!  You find your way\n  to the top, but be careful!  There are dangers\n  along the way.  You will recieve cues on your\n  map when you are near danger, but you must make\n  the right choice where to go!\n\n  Be careful on this great adventurous endeavor!\n\n  The map is a 10 x 10 grid, with (0,0) starting\n  in the top left corner.\n\n  "+s+"\n                  ")},c:function(){a(""+s)},h:function(t){a("Hiking mountain...");var e=l(t);e&&playGame.player.move(+e[0],+e[1]),this.m()},l:function(){a("\n\n  /*****   MAP LEGEND   *****/\n\n  * '&'     Player Icon\n  * '.'     Unknown location\n  * '*'     Visited location with no danger.\n  * 'X'     Visited location with known danger.\n  * '?'     Location with suspected danger.\n\n  * Nearby dangers appear as a number\n      * i.e. '1' or '2'.\n              ")},m:function(){if("ludicrous"===playGame.difficulty)return a("Map is disabled on ludicrous difficulty.");playGame.genMap();var t="",e=!0,r=!1,n=void 0;try{for(var i,o=playGame.mapDisplay[Symbol.iterator]();!(e=(i=o.next()).done);e=!0){var s=i.value,l=!0,h=!1,y=void 0;try{for(var d,u=s[Symbol.iterator]();!(l=(d=u.next()).done);l=!0){t+=d.value+"\t"}}catch(t){h=!0,y=t}finally{try{!l&&u.return&&u.return()}finally{if(h)throw y}}t+="\n"}}catch(t){r=!0,n=t}finally{try{!e&&o.return&&o.return()}finally{if(r)throw n}}a(t),this.r()}};a("❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️"),a("You have started SNOWEDGE on easy difficulty."),a("Type `g` to see the instructions"),o("easy"),document.onkeydown=function(t){var e=t.keyCode,r=document.activeElement,n=document.querySelector('input[type="text"]');if(13===e&&r===n){var i=n.value,o=Object.keys(h),s=i.charAt(0);o.includes(s)||a("Command not found"),n.value="";var l=!0,y=!1,d=void 0;try{for(var u,c=o[Symbol.iterator]();!(l=(u=c.next()).done);l=!0){var f=u.value;f===s&&h[f](i)}}catch(t){y=!0,d=t}finally{try{!l&&c.return&&c.return()}finally{if(y)throw d}}}}}();
