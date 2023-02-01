<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Liste des Argonautes</title>
    <link rel="stylesheet" type="text/css" href="{{ asset('/css/app.css') }}">
</head>
<body>

    <header>
        <h1>
          <img src="https://www.wildcodeschool.com/assets/logo_main-e4f3f744c8e717f1b7df3858dce55a86c63d4766d5d9a7f454250145f097c2fe.png" alt="Wild Code School logo" />
          Les Argonautes
        </h1>
      </header>
      
      <!-- Main section -->
      <main>
        
        <!-- New member form -->
        <h2>Ajouter un(e) Argonaute</h2>
        <div id="message"></div>
        <form class="new-member-form" id="memberForm">
          @csrf
          <label for="name">Nom de l&apos;Argonaute</label>
          <input id="name" name="name" type="text" placeholder="Charalampos" />

          <button type="submit">Envoyer</button>
        </form>
        
        <!-- Member list -->
        <h2>Membres de l'équipage</h2>
        <div class='number-member'>Il y a <span id='number-member'></span> membres</div>
        <section class="member-list" id="member-list">
          <div class="loading-spinner-rolling">
            <div class="loading-spinner"><div>
          </div>
            
            
        </section>
      </main>
      
      <footer>
        <p>Réalisé par Jason en Anthestérion de l'an 515 avant JC</p>
      </footer>
    
</body>
<script src="/js/app.js"></script>
</html>
