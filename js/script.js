((d) => {
  /* function anonima autoejecutable */
  const $btnMenu = d.querySelector(".menu-btn"),
    $menu =
      d.querySelector(
        ".menu"
      ); /* selectores necesarios dentro de la function  */

  $btnMenu.addEventListener("click", (e) => {
    /* asigna un evento al $btnMenu para escuchar el click */
    $btnMenu.firstElementChild.classList.toggle(
      "none"
    ); /* recorre los elementos dentro del boton en este caso los svg y si el primer hijo tiene la clase "none" la coloca sino la quita */
    $btnMenu.lastElementChild.classList.toggle(
      "none"
    ); /* recorre los elementos dentro del boton en este caso los svg y si el ultimo hijo tiene la clase "none" la coloca sino la quita */
    $menu.classList.toggle("is-active");
  });
  d.addEventListener("click", (e) => {
    /* se designa un evento directo al document de click y  */
    if (!e.target.matches(".menu a"))
      return false; /* si el evento del click no es a un elemento de la clase .menu a (enlace) retorna falso, pero si retorna verdadero ejecuta el siguiente codigo */
    $btnMenu.firstElementChild.classList.remove(
      "none"
    ); /* accede al primer hijo del $btnMenu y revisa en sus clases removiendo none, dejando visible el svg de hamburguesa  */
    $btnMenu.lastElementChild.classList.add(
      "none"
    ); /*  accede al ultimo hijo del $btnMenu y revisa en sus clases colocando none ocultando el svg de X */
    $menu.classList.remove(
      "is-active"
    ); /*  accede al menu. revisa en sus clases y remueve la clase "is-active" escondiendo los enlaces del menu y negando su interaccion con pointer-events:auto */
  });
})(document);

/* ************************** MEnu ***************************** */
/* ((d) => {
    const $btnMenu = d.querySelector(".menu-btn");
    const $menu = d.querySelector(".menu");
  
    $btnMenu.addEventListener("click", (e) => {
      $btnMenu.firstElementChild.classList.toggle("none");
      $btnMenu.lastElementChild.classList.toggle("none");
      $menu.classList.toggle("is-active");
    });
  
    d.addEventListener("click", (e) => {
      if (!e.target.matches(".menu a")) return false;
      $btnMenu.firstElementChild.classList.remove("none");
      $btnMenu.lastElementChild.classList.add("none");
      $menu.classList.remove("is-active");
    });
  })(document);
   */

/* ************************** ContactForm ***************************** */
((d) => {
  const $form = d.querySelector(".contact-form");
  const $loader = d.querySelector(".contact-form-loader");
  const $response = d.querySelector(".contact-form-response");
  $form.addEventListener("submit", (e) => {
    e.preventDefault();
    $loader.classList.remove("none");
    fetch("https://formsubmit.co/ajax/fc726b8da72a21fba5e5197437507eC2", {
      method: "POST",
      body: new FormData(e.target),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        console.log(json);
        location.hash = "#gracias";
        $form.reset();
      })
      .catch((err) => {
        console.log(err);
        let message =
          err.statusText || "Ocurrio un error al enviar, intenta nuevamente";
        $response.querySelector(
          "h3"
        ).innerHTML = `Error ${err.status}: ${message}`;
        $loader.classList.add("none");
      })
      .finally(() => {
        $loader.classList.add("none");
        setTimeout(() => {
          location.hash = "#close";
        }, 3000);
      });


  });
})(document);
