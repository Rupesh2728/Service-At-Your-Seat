import React from "react";
import styles from "./MovieNews.module.css";
import "./MovieNews2.module.css";

const MovieNews = () => {
  return (
    <>
      <body>
        <section className={styles.banner}>
          <div className={styles.bannerMainContent}>
            <h2>GET THE WORLD'S LATEST MOVIE NEWS</h2>
            <div class={styles.currentNewsHead}>
              <h3>
                RRR OSCAR :{" "}
                <span>
                  {" "}
                  MMKeeravaani is singing his acceptance speech! Wonderful.
                  Chandrabose simply says: “Namaste.”{" "}
                </span>
              </h3>

              <h3>
                {" "}
                Spider-Man: Into The Spider-Verse{" "}
                <span>
                  Empire's World-Exclusive Spider-Man: Across The Spider-Verse
                  Covers Revealed
                </span>
              </h3>

              <h3>
                Barry Keoghan Joins Gladiator 2{" "}
                <span>
                  {" "}
                  Barry Keoghan is seeing no slowing of his career momentum.He's
                  now in talks to join Ridley Scott's Gladiator sequel.
                </span>
              </h3>

              <h3>
                James Gunn Directing Superman: Legacy{" "}
                <span>
                  New DC Studios bosses James Gunn and Peter Safran's initial
                  "Gods And Monsters" in DC's most iconic hero, called Superman:
                  Legacy.
                </span>
              </h3>
            </div>
          </div>
          <div className={styles.bannerSubContent}>
            <div className={styles.hotTopic}>
              <img className={styles.img} alt="" src={require("./images/11.jpg")} />
              <div class={styles.hotTopicContent}>
                <h2>
                  Congratulations! to Critics Choice SUPER Award winners Tom
                  Cruise & #TopGun: Maverick!
                </h2>

                <h3>TOP GUN</h3>
                <p>
                  Take to the skies! Congrats to the #TopGun: Maverick team for
                  winning Best Action Movie and Best Actor in an Action Movie at
                  the Critics Choice Super Awards
                </p>
              </div>
            </div>
            <div className={styles.hotTopic}>
              <img alt="" src={require("./images/12.jpg")} />
              <div class={styles.hotTopicContent}>
                <h2>
                  Congratulations! to Critics Choice SUPER Award winners Tom
                  Cruise & #TopGun: Maverick!
                </h2>

                <h3>TOP GUN</h3>
                <p>
                  Take to the skies! Congrats to the #TopGun: Maverick team for
                  winning Best Action Movie and Best Actor in an Action Movie at
                  the Critics Choice Super Awards
                </p>
              </div>
            </div>
            <div className={styles.hotTopic}>
              <img alt="" src={require("./images/23.jpg")} />
              <div class={styles.hotTopicContent}>
                <h2>
                  Congratulations! to Critics Choice SUPER Award winners Tom
                  Cruise & #TopGun: Maverick!
                </h2>

                <h3>TOP GUN</h3>
                <p>
                  Take to the skies! Congrats to the #TopGun: Maverick team for
                  winning Best Action Movie and Best Actor in an Action Movie at
                  the Critics Choice Super Awards
                </p>
              </div>
            </div>
          </div>
        </section>
        <hr className={styles.hr}/>
        <main className={styles.main}>
          <h2>Top Stories</h2>
          <section className={styles.mainContainerLeft}>
            <div className={styles.containerTopLeft}>
              <article>
                <img alt="" src={require("./images/15.jpg")} />
                <div>
                  <h3>
                    Avatar: The Way Of Water Movie :A worthy sequel that's
                    dazzlingly immersive and hypnotic
                  </h3>

                  <p>
                    “The way of water connects all things. The sea is our home
                    before our birth and after we die.” Beyond the 3D visual
                    spectacle that Avatar is, something we trust James Cameron
                    to deliver, the franchise's beauty lies in its underlying
                    spiritual arc and ode to continuity of life. Life finds a
                    way. It evolves no matter the surroundings as love is
                    transformative.
                  </p>
                </div>
              </article>
            </div>
            <div className={styles.containerBottomLeft}>
              <article>
                <img alt="" src={require("./images/16.jpg")} />
                <div>
                  <h3>
                    Avatar: The Way Of Water Movie :A worthy sequel that's
                    dazzlingly immersive and hypnotic
                  </h3>

                  <p>
                    “The way of water connects all things. The sea is our home
                    before our birth and after we die.” Beyond the 3D visual
                    spectacle that Avatar is, something we trust James Cameron
                    to deliver, the franchise's beauty lies in its underlying
                    spiritual arc and ode to continuity of life. Life finds a
                    way. It evolves no matter the surroundings as love is
                    transformative.
                  </p>
                </div>
              </article>
            </div>
            <div className={styles.containerBottomLeft}>
              <article>
                <img alt="" src={require("./images/17.jpg")} />
                <div>
                  <h3>
                    Avatar: The Way Of Water Movie :A worthy sequel that's
                    dazzlingly immersive and hypnotic
                  </h3>

                  <p>
                    “The way of water connects all things. The sea is our home
                    before our birth and after we die.” Beyond the 3D visual
                    spectacle that Avatar is, something we trust James Cameron
                    to deliver, the franchise's beauty lies in its underlying
                    spiritual arc and ode to continuity of life. Life finds a
                    way. It evolves no matter the surroundings as love is
                    transformative.
                  </p>
                </div>
              </article>
            </div>
          </section>
        </main>
      </body>
    </>
  );
};

export default MovieNews;
