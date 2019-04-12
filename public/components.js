class HeaderComponent extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });


    shadow.innerHTML = `
    <style>
      :host {
        font-size: 16px;
        height: 3.5rem;

        display: block;
        
      }

      * {
        margin: 0;
        box-sizing: border-box;
      }

      h1 {
        font-size: 6rem;
      }
    
      h2 {
        font-size: 3.75rem;
      }
    
      h3 {
        font-size: 3rem;
      }
    
      h4 {
        font-size: 2.125rem;
      }
    
      h5 {
        font-size: 1.5rem;
      }
    
      h6 {
        font-size: 1.25rem;
      }
    
      .subtitle1 {
        font-size: 1rem;
      }
    
      .subtitle2 {
        font-size: 0.875rem;
      }
    
      .body1 {
        font-size: 1rem;
      }
    
      .body2 {
        font-size: 0.875rem;
      }
    
      .button-font {
        font-size: 0.875rem;
      }
    
      .caption {
        font-size: 0.75rem;
      }

      :host div.header {
        background-color: var(---header-theme, #616161);
      }

      .header {
        display: grid;
      }

      h4 {
        color: var(--header-theme-font, #fff);
      }
    </style>
    <div class="header"> 
      Test Header
    </div>
  `;
  }
}


class CardComponent extends HTMLElement {

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = `
    <style>
      :host {
        font-size: 16px;

        display: inline-block;
        
        padding: 1rem;
        box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
      }

      * {
        margin: 0;
        box-sizing: border-box;
      }

      h1 {
        font-size: 6rem;
      }
    
      h2 {
        font-size: 3.75rem;
      }
    
      h3 {
        font-size: 3rem;
      }
    
      h4 {
        font-size: 2.125rem;
      }
    
      h5 {
        font-size: 1.5rem;
      }
    
      h6 {
        font-size: 1.25rem;
      }
    
      .subtitle1 {
        font-size: 1rem;
      }
    
      .subtitle2 {
        font-size: 0.875rem;
      }
    
      .body1 {
        font-size: 1rem;
      }
    
      .body2 {
        font-size: 0.875rem;
      }
    
      .button-font {
        font-size: 0.875rem;
      }
    
      .caption {
        font-size: 0.75rem;
      }

      :host div.header {
        background-color: var(---header-theme, #616161);
      }

      .header {
        display: grid;
      }

      h4 {
        color: var(--header-theme-font, #fff);
      }
    </style>
    <slot></slot>
    `;
  }
}


export { HeaderComponent, CardComponent };