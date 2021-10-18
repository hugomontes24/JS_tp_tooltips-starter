'use strict';

/*************************************************************************************************/
/* *************************************** FONCTIONS ************************************** */
/*************************************************************************************************/

/**
 * Gestionnaire d'événement au clic sur le document
 *
 * On utilise ici de la délégation d'événement : on a installé le gestionnaire d'événement sur un élément englobant,
 * ici le document entier. Pour gérer ensuite le click, on va aller chercher l'élément précis qui a été cliqué grâce
 * à la propriété target de l'objet event récupéré en paramètre de la fonction.
 *
 * On va agir différement en fonction de si on a cliqué :
 *      - sur un tooltip (on le ferme)
 *      - sur un mot souligné (on ouvre le tooltip associé)
 *      - n'importe où ailleurs (on ferme le tooltip ouvert)
 *
 * @param event
 */
function onClickDocument(event)
{
    const target = event.target;

    // Si on a cliqué sur un tooltip...
    if(target.classList.contains('tooltip')){

        // ... on le masque
        target.classList.add('is-hidden');
    }
    // Sinon, si on a cliqué sur un mot souligné...
    else if(target.hasAttribute('data-tooltip')){

        // On ferme le tooltip ouvert le cas échéant
        closeTooltips();

        // On ouvre celui qui se trouve à l'intérieur de l'élément cliqué en supprimant la classe is-hidden
        target.querySelector('.tooltip').classList.remove('is-hidden');
    }
    // Sinon...
    else {

        // On ferme le tooltip ouvert
        closeTooltips();
    }
}

/**
 * Ferme le tooltip ouvert
 * Normalement il ne peut y avoir qu'un seul tooltip ouvert à la fois
 */
function closeTooltips()
{
    // On sélectionne un tooltip ouvert (à priori il ne peut y en avoir qu'un seul ouvert à la fois
    const openedTooltip = document.querySelector('.tooltip:not(.is-hidden)');

    // S'il existe bien un tooltip qui était ouvert, on le ferme
    if(openedTooltip != null) {
        openedTooltip.classList.add('is-hidden');
    }
}

/*************************************************************************************************/
/* *************************************** CODE PRINCIPAL ************************************** */
/*************************************************************************************************/

document.addEventListener('DOMContentLoaded', function () {

    /**
     * Sélection de tous les éléments qui possèdent l'attribut data "tooltip"
     * @type {NodeListOf<Element>}
     */
    const words = document.querySelectorAll('[data-tooltip]');

    /**
     * La boucle for...of est une boucle apparue avec la version 2015 d'ECMAScript
     * Elle est très pratique et permet de parcourir aussi bien les tableaux que les chaînes de caractères
     * La constante ou variable déclarée avant le of, ici word, contiendra chaque élément du pseudo-tableau words
     * https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/for...of
     */
    for (const word of words) {
        // rendre visible les mots soulignés.
        word.setAttribute('style','text-decoration:underline;color:greenyellow;cursor:pointer');

        // Création de l'élément <span> qui contiendra l'info-bulle (tooltip)
        const tooltip = document.createElement('span');

        // Ajout des classes tooltip et hidden (au départ l'info-bulle est masquée)
        tooltip.classList.add('tooltip', 'is-hidden');

        // On va chercher le texte de l'info-bulle dans l'attribut data "tooltip" de l'élément
        tooltip.textContent = word.getAttribute('data-tooltip');
        // faire apparaitre et décorer l'infobulle
        tooltip.setAttribute('style','position:absolute;background-color:#b67c7c;opacity:.9;border-radius:5px;max-width:190px')

        // On insère le nouvel élément <span> à la fin du contenu de l'élément existant.
        word.appendChild(tooltip);
    }

    // Installation d'un gestionnaire d'événement au clic avec délégation sur l'ensemble du document
    document.addEventListener('click', onClickDocument);

    // let word_over = document.querySelectorAll('.tooltip');
    // word_over.addEventListener('mouseover',function{
        
    // })
});