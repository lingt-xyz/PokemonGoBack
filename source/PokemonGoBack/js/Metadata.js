{// use local scope
    let cardString = `
Glameow:pokemon:cat:basic:cat:colorless:60:retreat:cat:colorless:2:attacks:cat:colorless:1:1,cat:colorless:2:2
Pikachu Libre:pokemon:cat:basic:cat:lightning:80:retreat:cat:colorless:1:attacks:cat:colorless:2:3,cat:colorless:2,cat:lightning:1:4
Pikachu:pokemon:cat:basic:cat:lightning:60:retreat:cat:colorless:1:attacks:cat:colorless:1:5,cat:colorless:2:6
Raichu:pokemon:cat:stage-one:Pikachu:cat:lightning:90:attacks:cat:colorless:2:7,cat:colorless:1,cat:lightning:2:8
Shellder:pokemon:cat:basic:cat:water:60:retreat:cat:colorless:1:attacks:cat:colorless:1,cat:water:1:9
Seaking:pokemon:cat:stage-one:Goldeen:cat:water:90:attacks:cat:water:1:10,cat:colorless:1:11
Goldeen:pokemon:cat:basic:cat:water:60:retreat:cat:colorless:1:attacks:cat:colorless:1:12
Frogadier:pokemon:cat:stage-one:Froakie:cat:water:70:attacks:cat:colorless:2:13
Froakie:pokemon:cat:basic:cat:water:50:retreat:cat:colorless:1:attacks:cat:colorless:1:14
Cloyster:pokemon:cat:stage-one:Shellder:cat:water:100:retreat:cat:colorless:3:attacks:cat:colorless:1,cat:water:1:15,cat:colorless:1,cat:water:2:16
Suicune:pokemon:cat:basic:cat:water:100:retreat:cat:colorless:1:attacks:cat:colorless:1,cat:water:1:17,cat:colorless:1,cat:water:2:18
Swanna:pokemon:cat:stage-one:Ducklett:cat:water:80:attacks:cat:colorless:1:19,cat:colorless:3:20
Ducklett:pokemon:cat:basic:cat:water:60:retreat:cat:colorless:1:attacks:cat:colorless:1:21
Purugly:pokemon:cat:stage-one:Glameow:cat:colorless:100:retreat:cat:colorless:2:attacks:cat:colorless:2:22,cat:colorless:3:23
Manectric:pokemon:cat:stage-one:Electrike:cat:lightning:90:retreat:cat:colorless:1:attacks:cat:lightning:1:24,cat:colorless:2:25
Electrike:pokemon:cat:basic:cat:lightning:60:retreat:cat:colorless:1:attacks:cat:colorless:1:26
Electivire:pokemon:cat:stage-one:Electabuzz:cat:lightning:110:retreat:cat:colorless:3:attacks:cat:colorless:2:27,cat:colorless:1,cat:lightning:2:28
Electabuzz:pokemon:cat:basic:cat:lightning:70:retreat:cat:colorless:2:attacks:cat:colorless:2:29
Helioptile:pokemon:cat:basic:cat:lightning:60:retreat:cat:colorless:1:attacks:cat:lightning:1:14,cat:colorless:1,cat:lightning:1:30
Tierno:trainer:cat:supporter:31
Potion:trainer:cat:item:32
Misty's Determination:trainer:cat:supporter:33
Pokémon Center Lady:trainer:cat:supporter:34
Clemont:trainer:cat:supporter:35
Lightning:energy:cat:lightning
Water:energy:cat:water
#
Meowstic:pokemon:cat:stage-one:Espurr:cat:psychic:90:retreat:cat:colorless:1:attacks:cat:psychic:1:36,cat:psychic:3:37
Jynx:pokemon:cat:basic:cat:psychic:70:retreat:cat:colorless:1:attacks:cat:colorless:2,cat:psychic:1:38
Jirachi:pokemon:cat:basic:cat:psychic:70:retreat:cat:colorless:1:attacks:cat:psychic:1:39,cat:colorless:2,cat:psychic:1:40
Meowth:pokemon:cat:basic:cat:colorless:60:retreat:cat:colorless:1:attacks:cat:colorless:1:41
Meowth:pokemon:cat:basic:cat:colorless:60:retreat:cat:colorless:1:attacks:cat:colorless:1:42
Machop:pokemon:cat:basic:cat:fight:70:retreat:cat:colorless:2:attacks:cat:fight:1:43
Doduo:pokemon:cat:basic:cat:colorless:60:retreat:cat:colorless:1:attacks:cat:colorless:1:44,cat:colorless:1:45
Dodrio:pokemon:cat:stage-one:Doduo:cat:colorless:90:retreat:cat:colorless:1:attacks:cat:colorless:3:46
Geodude:pokemon:cat:basic:cat:fight:60:retreat:cat:colorless:2:attacks:cat:fight:1:47,cat:colorless:2:48
Zubat:pokemon:cat:basic:cat:psychic:50:retreat:cat:colorless:1:attacks:cat:colorless:1:49
Haunter:pokemon:cat:stage-one:Gastly:cat:psychic:70:retreat:cat:colorless:1:attacks:cat:colorless:1,cat:psychic:1:50
Gastly:pokemon:cat:basic:cat:psychic:50:retreat:cat:colorless:1:attacks:cat:psychic:1:51
Diglett:pokemon:cat:basic:cat:fight:50:retreat:cat:colorless:1:attacks:cat:fight:1:52,cat:colorless:1,cat:fight:1:53
Dugtrio:pokemon:cat:stage-one:Diglett:cat:fight:90:retreat:cat:colorless:1:attacks:cat:fight:1:54,cat:colorless:2,cat:fight:1:55
#
Slowpoke:pokemon:cat:basic:cat:psychic:50:retreat:cat:colorless:1:attacks:cat:colorless:1:57,cat:psychic:2:58
Hitmonlee:pokemon:cat:basic:cat:fight:90:retreat:cat:colorless:1:attacks:cat:fight:1:59,cat:fight:2:60
Hitmonchan:pokemon:cat:basic:cat:fight:90:retreat:cat:colorless:1:attacks:cat:colorless:2:61,cat:colorless:2,cat:fight:1:62
Machoke:pokemon:cat:stage-one:Machop:cat:fight:90:retreat:cat:colorless:2:attacks:cat:fight:2:63
Espurr:pokemon:cat:basic:cat:psychic:50:retreat:cat:colorless:1:attacks:cat:colorless:1:64
Persian:pokemon:cat:stage-one:Meowth:cat:colorless:90:retreat:cat:colorless:1:attacks:cat:colorless:1:65,cat:colorless:2:66
Floral Crown:trainer:cat:item:67
Poké Ball:trainer:cat:item:68
Shauna:trainer:cat:supporter:69
Pokémon Fan Club:trainer:cat:supporter:70
Switch:trainer:cat:item:71
Energy Switch:trainer:cat:item:72
Red Card:trainer:cat:item:73
Wally:trainer:cat:supporter:74
Fight:energy:cat:fight
Psychic:energy:cat:psychic
`;
    let ability_string = `
Act Cute:deck:target:opponent:destination:deck:bottom:choice:them:1
Scratch:dam:target:opponent-active:20
Quick Attack:dam:target:opponent-active:10,cond:flip:dam:target:opponent-active:30
Flying Elekick:dam:target:opponent-active:50
Nuzzle:cond:flip:applystat:status:paralyzed:opponent-active
Quick Attack:dam:target:opponent-active:20,cond:flip:dam:target:opponent-active:10
Circle Circuit:dam:target:opponent-active:20*count(target:your-bench)
Thunderbolt:dam:target:opponent-active:100,deenergize:target:your-active:count(target:your-active:energy)
Rain Splash:dam:target:opponent-active:20
Soaking Horn:dam:target:opponent-active:10,cond:healed:target:your-active:dam:target:opponent-active:80
Reckless Charge:dam:target:opponent-active:40,dam:target:your-active:10
Reckless Charge:dam:target:opponent-active:20,dam:target:your-active:10
Cut:dam:target:opponent-active:30
Pound:dam:target:opponent-active:10
Clamp Crush:dam:target:opponent-active:30,cond:flip:deenergize:target:opponent-active:1,applystat:status:paralyzed:opponent-active
Spike Cannon:dam:target:opponent-active:30,cond:flip:dam:target:opponent-active:30,cond:flip:dam:target:opponent-active:30,cond:flip:dam:target:opponent-active:30,cond:flip:dam:target:opponent-active:30,cond:flip:dam:target:opponent-active:30
Spiral Drain:dam:target:opponent-active:20,heal:target:your-active:20
Aurora Beam:dam:target:opponent-active:80
Wing Attack:dam:target:opponent-active:20
Brave Bird:dam:target:opponent-active:80,dam:target:your-active:20
Lunge:cond:flip:dam:target:opponent-active:20
Slash:dam:target:opponent-active:30
Nyan Press:dam:target:opponent-active:40,cond:flip:dam:target:opponent-active:40:else:applystat:status:paralyzed:opponent-active
Random Spark:dam:target:choice:opponent:30
Bite:dam:target:opponent-active:40
Bite:dam:target:opponent-active:10
Knuckle Punch:dam:target:opponent-active:30
Electroslug:dam:target:opponent-active:90
Knuckle Punch:dam:target:opponent-active:20
Destructive Beam:cond:flip:deenergize:target:opponent-active:1
Tierno:draw:3
Potion:heal:target:choice:your:30
Misty's Determination:cond:ability:deck:target:your:destination:discard:choice:you:1:(search:target:your:source:deck:filter:top:8:1,shuffle:target:your)
Pokémon Center Lady:heal:target:choice:your:60,destat:target:last
Clemont:search:target:your:source:deck:filter:energy:4
Ear Influence:redamage:source:choice:opponent:destination:opponent:count(target:last:source:damage)
Psychic:dam:target:opponent-active:60,dam:target:opponent-active:count(target:opponent-active:energy)*10
Hug:dam:target:opponent-active:30,applystat:status:stuck:opponent-active
Wish:search:target:your:source:deck:1
Heart Sign:dam:target:opponent-active:50
Act Tough:dam:target:opponent-active:10,cond:count(target:your-active:energy:psychic)>0:dam:target:opponent-active:20
Exhausted Tackle:cond:flip:dam:target:opponent-active:30:else:dam:target:your-active:30
Knuckle Punch:dam:target:opponent-active:10
Double Stab:cond:flip:dam:target:opponent-active:10,cond:flip:dam:target:opponent-active:10
Doduo Delivery:draw:2
Fury Attack:dam:target:opponent-active:40,cond:flip:dam:target:opponent-active:40,cond:flip:dam:target:opponent-active:40,cond:flip:dam:target:opponent-active:40
Rollout:dam:target:opponent-active:10
Flail:dam:target:opponent-active:count(target:your-active:damage)*10
Skill Dive:dam:target:opponent:10
Poison Ring:applystat:status:stuck:opponent-active,applystat:status:poisoned:opponent-active
Sleep Poison:cond:flip:(applystat:status:asleep:opponent-active,applystat:status:poisoned:opponent-active)
Mine:search:target:opponent:source:deck:filter:top:1:0,cond:choice:shuffle:target:opponent
Mud Slap:dam:target:opponent-active:20
Earthquake:dam:target:opponent-active:60,dam:target:your-bench:10
Rock Tumble:dam:target:opponent-active:60
Scratch:dam:target:opponent-active:10
Spacing Out:cond:flip:heal:target:your-active:10
Scavenge:cond:ability:deenergize:target:your-active:1:(search:target:your:source:discard:filter:cat:item:1)
Stretch Kick:dam:target:choice:opponent-bench:30
Spiral Kick:dam:target:opponent-active:30
Bullet Punch:dam:target:opponent-active:20,cond:flip:dam:target:opponent-active:20,cond:flip:dam:target:opponent-active:20
Mach Cross:dam:target:opponent-active:60
Beatdown:dam:target:opponent-active:40
Twinkle:applystat:status:asleep:opponent-active
Fake Out:dam:target:opponent-active:30,cond:flip:applystat:status:paralyzed:opponent-active
Ambush:dam:target:opponent-active:40,cond:flip:dam:target:opponent-active:30
Floral Crown:add:target:your:trigger:opponent:turn-end:(heal:target:self:20)
Poké Ball:cond:flip:search:target:your:source:deck:filter:pokemon:1
Shauna:deck:target:your:destination:deck:count(your-hand),shuffle:target:your,draw:5
Pokémon Fan Club:search:target:your:source:deck:filter:pokemon:cat:basic:2,shuffle:target:your
Switch:swap:source:your-active:destination:choice:your-bench
Energy Switch:reenergize:target:choice:your:1:target:choice:your:1
Red Card:deck:target:opponent:destination:deck:count(opponent-hand),shuffle:target:opponent,draw:opponent:4
Wally:search:target:choice:your-pokemon:cat:basic:source:deck:filter:evolves-from:target:last:1,shuffle:target:your
`;


    /**
    Glameow:pokemon : cat:basic : cat:colorless : 60 : retreat:cat:colorless:2 : attacks : cat:colorless:1:1 , cat:colorless:2:2
    Raichu:pokemon : cat:stage-one : Pikachu : cat:lightning : 90 : attacks:cat:colorless:2:7, cat:colorless:1,cat:lightning:2:8
    Swanna:pokemon : cat:stage-one : Ducklett : cat:water : 80 : attacks:cat:colorless:1:19,cat:colorless:3:20
    Electivire:pokemon : cat:stage-one : Electabuzz : cat:lightning : 110 : retreat:cat:colorless:3 : attacks:cat:colorless:2:27,cat:colorless:1,cat:lightning:2:28
    Shauna:trainer : cat:supporter : 69
    Psychic:energy : cat:psychic
    */
    //([a-zA-ZÀ-ÿ-]+):(pokemon|trainer|energy):cat:([a-zA-ZÀ-ÿ\-]+):([a-zA-ZÀ-ÿ\-]+):cat:\w+:[0-9]+:retreat:cat:\w+:[0-9]+:attacks:cat:\w+:[0-9]+:[0-9]+,cat:\w+:[0-9]+,cat:\w+:[0-9]+:[0-9]+
    let cardStrings = cardString.split('\n');
    let cardIndex = 0;
    let typePattern = /^([a-zA-ZÀ-ÿ-' ]+):(pokemon|trainer|energy):(.*)$/;
    let pokemonPattern = /^cat:((basic)|(stage-one:[a-zA-ZÀ-ÿ-' ]+)):cat:([a-zA-Z]+):([0-9]+):(retreat.*|attacks.*)$/;
    let retreatPattern = /^retreat:cat:([a-zA-Z]+):([0-9]+):(.*)$/;
    let attackPattern1 = /^cat:([a-zA-Z]+):([0-9]+):([0-9]+)$/;
    let attackPattern2 = /^cat:([a-zA-Z]+):([0-9]+),cat:([a-zA-Z]+):([0-9]+):([0-9]+)$/;
    for (let item of cardStrings) {
        if (item) {// ignore empty string
            cardIndex++;
            //console.log(item, index, _card_index);
            if ("#" != item) {// ignore "#"
                let items = item.match(typePattern);

                // name, type
                let cardName = items[1];
                let cardType = items[2];
                let subString = items[3];
                switch (cardType) {
                    case "pokemon":
                        // stge
                        let pokemonInfos = subString.match(pokemonPattern);
                        let cardStage = "";
                        if ("basic" == pokemonInfos[1]) {// basic
                            cardStage = "basic";
                        } else {// stage-one
                            cardStage = "stage-one";
                            let basicPokemon = pokemonInfos[1].split(":")[1];
                        }

                        // hp
                        let property = pokemonInfos[4];
                        let hp = pokemonInfos[5];
                        let abilityString = pokemonInfos[6];
                        let attackString = "";

                        //retreat
                        if (abilityString.startsWith("retreat")) {
                            let retreatInfos = abilityString.match(retreatPattern);
							//console.log(retreatInfos);
                            let retreatEnergyType = retreatInfos[1];
                            let retreatEnergyPoint = retreatInfos[2];
                            attackString = retreatInfos[3];
                        }else{
                            attackString = abilityString;
                        }

                        // attacks
                        attackString = attackString.substring("attacks".length+1, attackString.length);
                        let attackInfos = attackString.split(",");
                        for(let i=0; i<attackInfos.length; i++){
                            let attack = attackInfos[i];
                            let simpleAttackInfos = attack.match(attackPattern1);
                            if(simpleAttackInfos){
                                let energyType1 = simpleAttackInfos[1];
                                let energyType1Point = simpleAttackInfos[2];
                                let ability = simpleAttackInfos[3];
                            }else{
                                attack += attackInfos[++i];
                                let complexAttackInfos = attack.match(attackPattern2);
                                if(complexAttackInfos){
                                    let energyType1 = complexAttackInfos[1];
                                    let energyType1Point = complexAttackInfos[2];
                                    let energyType2 = complexAttackInfos[3];
                                    let energyType2Point = complexAttackInfos[4];
                                    let ability = complexAttackInfos[5];
                                }
                            }
                        }

                        break;
                    case "trainer":
                        let infos = subString.split(":");
                        let trainerType = infos[1];
                        let ability = infos[2];
                        break;
                    case "energy":
                        let energyInfos = subString.split(":");
                        let energyType = energyInfos[1];
                        break;
                    default:
                        break;
                }
            }
        }
    }
}