 let playlists = await getAllPlayList(token, categories, 10);
    playlists = JSON.parse(playlists);
    console.log(playlists);