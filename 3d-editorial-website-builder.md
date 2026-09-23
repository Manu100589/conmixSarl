---
name: 3d-editorial-website-builder
description: Builds ultra-premium 3D editorial landing pages and interactive multi-section websites for any business domain using React, Vite, Tailwind CSS, Three.js, GSAP ScrollTrigger, Lenis smooth scroll, and custom typographic motion signatures.
---

# 3D Editorial Website Generator

Ce skill permet d'architecturer et de générer un site web landing page / studio d'exception pour **n'importe quel type d'entreprise** (Agence d'Architecture, Immobilier de Luxe, Studio IA & SaaS, Marque de Luxe, Fintech, Santé & Biotech, Agence Créative, Automobile, etc.).

---

## 1. Direction Artistique & Principes Design

### Palette Éditoriale Haute Couture
- **Fond Principal** : Gris très clair éditorial (`#F1F1EF` / `#F8F8F6`) ou Mode Sombre Profond (`#0A0A0A`).
- **Typographie Principale** : Noir profond (`#0A0A0A` / `#080808`) ou Blanc Pur (`#FFFFFF`).
- **Couleur d'Accent Signée** : À adapter selon l'industrie :
  - *Digital & Tech / Studio* : Orange Vif (`#FF6500` / `#FF8A00`)
  - *Immobilier de Luxe & Architecture* : Or / Champagne (`#D4AF37` / `#C5A059`)
  - *Biotech & Santé / IA* : Vert Émeraude Électrique (`#00E676` / `#00D084`)
  - *SaaS & Fintech* : Bleu Roi Électrique (`#0066FF` / `#2979FF`)
  - *Luxury & High Fashion* : Violet Profond / Néon (`#7C3AED` / `#A855F7`)

### Style & Esthétique
- Typographie massive et audacieuse (`font-black`, `uppercase`, `tracking-tighter`, `leading-[0.92]`).
- Espace négatif généreux (pas de grilles de cartes SaaS génériques).
- Conteneur 3D WebGL unifié et persistant épinglé au scroll.
- Alignement éditorial strict : **Textes à gauche (max 52%)**, **3D / Médias à droite (46% - 48%)** sur desktop et mobile pour éviter tout chevauchement.

---

## 2. Système de Motion Typographique (H1 & H2)

Ne jamais se contenter de simples `fade-in` ou `fade-up`. Utiliser les 5 signatures typographiques GSAP + ScrollTrigger :

### 1. `SplitMaskReveal` (H1 & Titres Majeurs)
- Lignes découpées dans des wrappers `overflow: hidden`.
- Animation au scroll : `opacity: 0 -> 1`, `translateY(100%) -> translateY(0%)`, `clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%) -> polygon(0 0, 100% 0, 100% 100%, 0 100%)`.
- Stagger léger entre les lignes (`0.1s`).

### 2. `KineticTracking` (H2 & En-têtes de Sections)
- Contrôle direct du `letter-spacing` au scroll via `ScrollTrigger` (`scrub`).
- État initial : `letterSpacing: 0.25em`, `opacity: 0`.
- État actif : `letterSpacing: -0.04em`, `opacity: 1`.
- État sortie : `letterSpacing: 0.15em` au défilement hors de l'écran.

### 3. `WordDisplacement` (H2 & Déclarations de Vision)
- Découpe par mots avec trajectoires micro-décalées individuelles (`x: -12px..12px`, `y: 30px..42px`, `rotation: ±1.5°`).
- Stagger très faible (`0.04s`) pour faire converger les mots avec précision.

### 4. `LineParallax` (H1 Éditoriaux Multi-lignes)
- Chaque ligne du titre défile à une vitesse relative différente au scroll (`speeds: [1.0, 0.85, 1.15, 0.90]`).
- Effet de profondeur typographique tridimensionnelle au défilement.

### 5. `Subtle3DAxis` (H2 d'Offres & Valeurs)
- Conteneur en perspective (`perspective: 1000px`).
- Rotation 3D subtile de l'axe : `rotateX: 4°`, `rotateY: -2°`, `translateZ: -25px` qui s'aplanit en douceur au scroll.

---

## 3. Structure Générale de l'Expérience

1. **HERO SECTION**
   - En-tête minimaliste éditorial.
   - Titre H1 `SplitMaskReveal` massif + sous-titre stratégique + CTA à effet magnétique (`MagneticButton`).
   - Scène 3D WebGL interactive épinglée sur la moitié droite (`w-[46%] right-0`).

2. **SECTION SERVICES / OFFRES EN TUNNEL 3D** (`HorizontalServicesSection`)
   - Expérience interactive épinglée au scroll (`sticky h-screen`).
   - Objets 3D WebGL qui morphment / transforment leurs géométries selon l'offre active (ex: Bâtiment 3D -> Maquette -> Plan d'Architecture ; ou Laptop 3D -> Smartphone -> SaaS Panel).
   - Indicateur de progression, badges de métadonnées et boutons de navigation par points.

3. **SECTION "À PROPOS" ÉDITORIALE EN 4 ACTES** (`AboutSection`)
   - **Acte 1 : Introduction Éditoriale** (H1 `LineParallax`).
   - **Acte 2 : Promesse & Impact** (Dévoilement séquentiel de mots + Statistiques chiffrées).
   - **Acte 3 : Différenciation & Piliers** (Titre H2 `Subtle3DAxis` + Cartes interactives 2x2).
   - **Acte 4 : Vision & Méthodologie** (Titre H2 `WordDisplacement` + Frise chronologique progressive en 4 étapes).
   - **Noyau 3D Central** (`DigitalCore`) : Sphère / Orbe 3D réactive avec des nœuds en orbite représentant les compétences clés de l'entreprise.

4. **SEQUENCE SÉQUENTIELLE CANVAS 2D** (`CraftSequenceSection`)
   - Préchargement d'une séquence de 100 images haute définition (format `/im/Sequence_000.jpg` à `_099.jpg`).
   - Défilement fluide de la séquence sur le Canvas 2D contrôlé par GSAP `ScrollTrigger` (`scrub`).
   - Titre H2 `SplitMaskReveal` + cartes dynamiques selon le pourcentage de scroll.

5. **GALERIE PROJETS 3D EN CARROUSEL HORIZONTAL** (`PortfolioSection`)
   - Galerie 3D Coverflow avec rotation d'axe `rotateY: ±16°` et profondeur `translateZ`.
   - Cartes de réalisation avec badges, statistiques de performance et liens interactifs.
   - Navigation et indicateurs d'étape (`01 / 05`).

6. **FORMULAIRE D'INITIALISATION DE PROJET** (`ContactFormSection`)
   - Formulaire moderne avec chips de sélection du type de projet et du budget.
   - Champs de saisie stylisés et retour de validation.

7. **FOOTER HAUTE COUTURE** (`FooterSection`)
   - Grand titre d'appel H2 `KineticTracking`.
   - Liens de navigation, informations de contact et réseaux sociaux.

---

## 4. Stack Technique Obligatoire

- **Framework** : React + Vite + TypeScript.
- **Styling** : Tailwind CSS + Vanilla CSS (`index.css` design tokens).
- **Animations** : GSAP 3 + ScrollTrigger + Lenis Smooth Scroll.
- **3D WebGL** : Three.js / React Three Fiber / `@react-three/drei`.
- **Canvas** : HTML5 Canvas 2D Context pour les séquences d'images.

---

## 5. Règle d'Or de Cadrage 3D & Mobile

> **RÈGLE CRITIQUE** : Le canvas 3D et tous ses éléments `<Html>` Drei doivent TOUJOURS être contraints dans un conteneur strictly limité à droite (`w-[46%] sm:w-[48%] right-0 pointer-events-none overflow-hidden`).
> Aucun objet 3D ou overlay ne doit JAMAIS recouvrir la zone de texte située à gauche (`max-w-[52%]`), aussi bien sur Desktop que sur Mobile.
