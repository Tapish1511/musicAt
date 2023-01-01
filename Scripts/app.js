/*<div class="body-item">
    <h1 class="item-heading">heading 1</h1>
    <div class="card-container">
        <a href="#" class="card-item">
            <div class="image-container">
                <img src="../images/logo.png" alt="">
            </div>
            <h3 class="card-heading">card 1</h3>
            <p class="card-artist">Lorem ipsum dolor sit amet.</p>
        </a>
    <div>
    <div class="read-more"><a href="#">read more</a></div>
<div>*/

let bodyContainer = document.getElementById('main-body');
console.log('hello world');

/* <a href="#" class="card-item">
    <div class="image-container">
        <img src="../images/logo.png" alt="">
    </div>
    <h3 class="card-heading">card 1</h3>
    <p class="card-artist">Lorem ipsum dolor sit amet.</p>
</a> */


let client_id = 'b5a41ba2b9b04c4a83ef347de1cc85a0';
let client_secret = 'af8a818f4aeb49e7a7b3602854d41347';



async function getAccessToken(){
    let response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
          },
          body:'grant_type=client_credentials'
    });
    const data = await response.json();
    return data.access_token;
}
     

async function getCategory(access_token){

    let result = await fetch('https://api.spotify.com/v1/browse/categories?country=In', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + access_token
        },
        json:true
    });
    let data = await result.json();
    return data.categories.items;
}

async function getCategoryPlayList(access_token, categoryId){

    let result = await fetch(`https://api.spotify.com/v1/browse/categories/${categoryId}/playlists?country=IN`, {
        method:'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + access_token
        },
        json:true
    });

    let data = await result.json();
    return data.playlists.items;
    // let playListOption = {
    //     url: `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists?country=IN`,
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //         Authorization: 'Bearer ' + access_token
    //     },
    //     json:true
    // }

    // return new Promise((resolve, reject)=>{
    //     setTimeout(()=>{
    //         request.get(playListOption, (error, response, body)=>{
    //             if(!error && response.statusCode === 200){
    //                 resolve(JSON.stringify(body.playlists.items));
    //             }
    //         });
    //     },2000);
    // });
}

async function getAllPlayList(access_token, categories, limit){
    if(limit>20){
        alert('somthing going wrong')
        return;
    }
    let playlists = []
    for(i=0; i<limit; i++){
        let playlist = await getCategoryPlayList(access_token, categories[i].id);
        playlists.push(playlist);
    }
    return playlists
}


async function main(){
    let token = await getAccessToken();
    let categories = await getCategory(token);
    let playlists = await getAllPlayList(token, categories, 10);
    console.log(playlists);
    bodyContainer.innerHTML = createBody(categories, playlists);
}

function createCard(imageUrl, title, artist){
    let card = '';

    card += `<a href="#" class="card-item">
                <div class="image-container">
                    <img src="${imageUrl}" alt="">
                </div>
                <h3 class="card-heading">${title}</h3>
                <p class="card-artist">${artist}</p>
            </a>`;

    return card;
}

function createBodyItem(heading, cards){
    let bodyItem = ''
    bodyItem += `<div class="body-item">
                    <h1 class="item-heading">${heading}</h1>
                    <div class="card-container">
                        ${cards}
                    </div>
                    <div class="read-more"><a href="#">read more</a></div>
                </div>`;
    return bodyItem;
}

function createBody(categories, playlists){
    let mainBody = '';
    for(let i=0; i<playlists.length; i++){
        let allCards = '';
        for(let j=0; j<playlists[i].length; j++){
            console.log(playlists[i][j].name);
            allCards += createCard(playlists[i][j].images[0].url, playlists[i][j].name, playlists[i][j].description);
        }

        console.log(categories[i].name + ' @album');
        mainBody += createBodyItem(categories[i].name, allCards)
    }
    // console.log(mainBody);
    return mainBody;
}

main()
