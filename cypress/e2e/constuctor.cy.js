describe('ingredients drag&drop works correctly', () => {
  const testIngredients='[data-test="ingredients"]';
    beforeEach(()=> {
        cy.getIngredients();
    });
    it('should drag bun', ()=> {
      cy.get(testIngredients).contains("булка").trigger("dragstart");
      cy.get('[data-test="drop-area"]').trigger("drop");
      cy.get('[data-test="bun-top"]').should("exist");
      cy.get('[data-test="bun-bottom"]').should("exist");
    });
    it('should drag ingredient', ()=> {
        cy.get(testIngredients).contains("Соус").trigger("dragstart");
        cy.get('[data-test="drop-area"]').trigger("drop");
        cy.get('[data-test="main"]').should("exist");    
      });
      it('should modal open and close', ()=> {
        cy.get(testIngredients).contains("Соус").click();
        cy.contains('Детали ингредиента');  
        cy.contains('Соус');  
        cy.get('[data-test="close-button"]').click();
        cy.contains('Соберите бургер');  
      });
      it('should modal open and close by modal overlay', ()=> {
        cy.get(testIngredients).contains("булка").click();
        cy.contains('Детали ингредиента');  
        cy.contains('булка');  
        cy.get('[data-test="modal-overlay"]').click({force: true});
        cy.contains('Соберите бургер');  
      });
     
  }); 