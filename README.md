# AssignmentApp

Projet front-end pour les étudiants du Master MIAGE MBDS de Madagascar

## Colaborateur

     - 04 ANDRIANTENAINA NIRINARISOA Fanilo Loïc Christophère
     - 12 RADIMILAHY Harenanomenjanahary Naivo

## Etapes pour demarrer en locale

1. Recuparation du projet : `git clone`
2. instalation des packages : `npm install`
3. Demarrage du serveur d'application `ng serve`
4. ouverture de l'app dans le navigateur avec le lien : `http://localhost:4200`
5. lien sur render: https://angularfrontm2miage2023-2024-74a7.onrender.com/

## contribution

nous avons ajouter les fonctionnalite suivante dans ce projet :

* Ajouter une Toolbar et une SideBar/Sidenav pour la présentation.
* Ajouter une gestion de login/password
    nous avons utiliser une authentification à l'aide de JSON Web Tokens (JWT)
* pour lesa assignment nous avons :  
  * ajouter l'Auteur (nom ou photo de l'élève).
  * Matière.
  * Note sur 20, on ne peut marquer "rendu" un Assignment qui n'a pas été noté.
  * Remarques.
* Améliorer l'affichage des Assignments :
  * chaque Assignment sous forme d'une Material Card (le titre, la date, l'élève, une petite image illustrant la matière, la photo du prof en petit en haut à droite)   
  * La vue détails montrera en plus les remarques, la note, s'il a été rendu  
  * Les formulaires d'ajout et de détails proposeront un choix fixe de matières (un Formulaire de type Stepper)
* Collection d'élèves et de profs pour faciliter l'association devoir/élève et matières/profs
