describe('ingredient modal', () => {
    beforeEach(function () {
        cy.visit('http://localhost:3000');

        cy.intercept(
            "GET",
            "https://norma.nomoreparties.space/api/ingredients",
            {
                success: true,
                data: [{ "_id": "643d69a5c3f7b9001cfa093c", "name": "Краторная булка N-200i", "type": "bun", "proteins": 80, "fat": 24, "carbohydrates": 53, "calories": 420, "price": 1255, "image": "https://code.s3.yandex.net/react/code/bun-02.png", "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png", "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png", "__v": 0 }, { "_id": "643d69a5c3f7b9001cfa0941", "name": "Биокотлета из марсианской Магнолии", "type": "main", "proteins": 420, "fat": 142, "carbohydrates": 242, "calories": 4242, "price": 424, "image": "https://code.s3.yandex.net/react/code/meat-01.png", "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png", "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png", "__v": 0 }, { "_id": "643d69a5c3f7b9001cfa0942", "name": "Соус Spicy-X", "type": "sauce", "proteins": 30, "fat": 20, "carbohydrates": 40, "calories": 30, "price": 90, "image": "https://code.s3.yandex.net/react/code/sauce-02.png", "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png", "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png", "__v": 0 }, { "_id": "643d69a5c3f7b9001cfa0943", "name": "Соус фирменный Space Sauce", "type": "sauce", "proteins": 50, "fat": 22, "carbohydrates": 11, "calories": 14, "price": 80, "image": "https://code.s3.yandex.net/react/code/sauce-04.png", "image_mobile": "https://code.s3.yandex.net/react/code/sauce-04-mobile.png", "image_large": "https://code.s3.yandex.net/react/code/sauce-04-large.png", "__v": 0 }, { "_id": "643d69a5c3f7b9001cfa093f", "name": "Мясо бессмертных моллюсков Protostomia", "type": "main", "proteins": 433, "fat": 244, "carbohydrates": 33, "calories": 420, "price": 1337, "image": "https://code.s3.yandex.net/react/code/meat-02.png", "image_mobile": "https://code.s3.yandex.net/react/code/meat-02-mobile.png", "image_large": "https://code.s3.yandex.net/react/code/meat-02-large.png", "__v": 0 }, { "_id": "643d69a5c3f7b9001cfa093d", "name": "Флюоресцентная булка R2-D3", "type": "bun", "proteins": 44, "fat": 26, "carbohydrates": 85, "calories": 643, "price": 988, "image": "https://code.s3.yandex.net/react/code/bun-01.png", "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png", "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png", "__v": 0 }]
            }
        )

        cy.get('[data-testid=bun-section] div[draggable]').first().trigger('dragstart');
        cy.get('[data-testid=drop]').trigger('drop');

        cy.get('[data-testid=souce-section] div[draggable]').first().trigger('dragstart');
        cy.get('[data-testid=drop]').trigger('drop');

        cy.get('[data-testid=main-section] div[draggable]').first().trigger('dragstart');
        cy.get('[data-testid=drop]').trigger('drop');
    })

    it('create order click ', () => {
        cy.clearCookie('token')
        const username = 'naruto@naruto.ru'
        const password = 'naruto'

        cy.get('[data-testid=order-button]').should('be.not.disabled').click();

        cy.location().should(loc => {
            expect(loc.pathname).to.eq('/login')
        });

        cy.get('[data-testid=login]').type(username);
        cy.get('[data-testid=password]').type(password);

        cy.get('[data-testid=submit]').should('be.not.disabled').click();

        cy.get('[data-testid=order-button]').should('be.not.disabled').click();

        cy.intercept(
            "POST",
            "https://norma.nomoreparties.space/api/orders",
            {
                success: true,
                name: "Краторный бургер",
                order: {
                    ingredients: [{ "_id": "643d69a5c3f7b9001cfa093c", "name": "Краторная булка N-200i", "type": "bun", "proteins": 80, "fat": 24, "carbohydrates": 53, "calories": 420, "price": 1255, "image": "https://code.s3.yandex.net/react/code/bun-02.png", "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png", "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png", "__v": 0 }, { "_id": "643d69a5c3f7b9001cfa093c", "name": "Краторная булка N-200i", "type": "bun", "proteins": 80, "fat": 24, "carbohydrates": 53, "calories": 420, "price": 1255, "image": "https://code.s3.yandex.net/react/code/bun-02.png", "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png", "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png", "__v": 0 }],
                    _id: "648c77058a4b62001c85df8e",
                    owner: { "name": "naruto", "email": "naruto@naruto.ru", "createdAt": "2023-04-25T12:55:24.731Z", "updatedAt": "2023-05-30T14:39:49.453Z" },
                    status: "done",
                    name: "Краторный бургер",
                    createdAt: "2023-06-16T14:51:49.946Z",
                    updatedAt: "2023-06-16T14:51:50.044Z",
                    number: 9028,
                    price: 2510
                }
            }
        ).as('doOrder');
        cy.wait('@doOrder').then(() => {
            cy.get('#burger-modals').should('contain', 'идентификатор заказа')
            cy.get('[data-testid=close-modal] svg').click();
        })

    })
})
