import React, { Component } from "react";
import "../styles/stylesheet.css";
import "../styles/Article.css";
import Navbar from "./Navbar.js";
import Footer from "./Footer.js";

export default class Article extends Component {
    render(){
        return(
            <div className="home-container bg-light">
                <Navbar/>
                <img id="image" src="../resources/trump1920x1080.jpg"/>
                <div className="text-box">
                    <h1>Trump gifter seg for 19. gang</h1>
                    <h3>Denne gangen med 16 år gamle Greta Thunberg</h3><br/>
                    <p id="info-text">Av KASPER VEDAL GUNDERSEN | 22.10.2019 | 15:53</p><br/>
                    <p className="mx-auto">NEW YORK (IrishMedia): Det kontroversielle bildet ble delt på Twitter i helgen, og viser Donald Trump som blir drept av hælen til Nancy Pelosi,<br/>
                     lederen av Representantenes hus og den høyest plasserte demokraten i det politiske hierarkiet i USA.
                     <br/><br/>
                     Gikk viralt: 12.000 kommentarer
Bildet som Barbra Streisand delte i helgen, eller tegningen, har gått viralt og har så langt fått over 8000 likes og over 12.000 kommentarer.
<br/>
I kommentarfeltet får Streisand alt fra ros til beinhard kritikk for å ha delt bildet. Flere medier og flere på Twitter omtaler også bildet som ﻿«grusomt»﻿.
En av dem som er ute <br/>
og kritiserer bildet, er Trumps sønn, Donald Trump jr..

Han reagerer på at flere medier ikke er ute og kritiserer bildet og delingen.
<br/>
Dette er derimot ikke første gang Streisand går hardt ut mot president Trump.

Tidligere har hun blant annet uttalt at Donald Trump fikk henne til å legge på seg vekt. I 2018 kom Barbra Streisand også ut med et nytt album, og i sangen «Don't Lie to Me» tar hun et tydelig oppgjør med Donald Trump.

I løpet av helgen har hun også kommet med flere andre angrep og lagt ut flere andre Twitter-meldigner om Trump. Se dem her:</p>
«Trump har sammenbrudd»
Delingen av Trump som blir drept av hælen til Pelosi, kom som sagt etter forrige ukes «oppgjør» mellom Pelosi og Trump i Det hvite hus.

På møtet kalte president Trump demokraten Pelosi for en tredjeklasses politiker, mens hun kontret med at «Trump har sammenbrudd».

Møtet fant sted onsdag i forrige uke, og det var Trumps regjering som hadde kalt inn til møtet for å diskutere situasjonen i Syria.


                </div>
                
                <Footer/>
            </div>
        );
    }
}