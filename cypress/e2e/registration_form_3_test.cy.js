beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')

})

/*
BONUS TASK: add visual tests for registration form 3
Task list:
* Test suite for visual tests for registration form 3 is already created
* Create tests to verify visual parts of the page:
    * radio buttons and its content
    * dropdown and dependencies between 2 dropdowns
    * checkboxes, their content and links
    * email format
 */
it('Dropdown is correct', () => {
    // Select second element and create screenshot for this area, and full page
    cy.get('#country').select(1).screenshot('Country')
        cy.screenshot('Full page screenshot')

    // Get the length of array of elements in Cars dropdown
    cy.get('#country').children().should('have.length', 4)

    //Check  that first element in the dropdown has no text
    cy.get('#country').find('option').eq(0).should('have.text', '')
    cy.get('#country').find('option').eq(1).should('have.text', 'Spain')
    cy.get('#country').find('option').eq(2).should('have.text', 'Estonia')
    cy.get('#country').find('option').eq(3).should('have.text', 'Austria')

    cy.get('#country').select('Spain')
    cy.get('#city').find('option').eq(0).should('be.empty')
    cy.get('#city').find('option').eq(1).should('have.text', 'Malaga')
    cy.get('#city').find('option').eq(2).should('have.text', 'Madrid')
    cy.get('#city').find('option').eq(3).should('have.text', 'Valencia')
    cy.get('#city').find('option').eq(4).should('have.text', 'Corralejo')

    cy.get('#country').select('Estonia')
    cy.get('#city').find('option').eq(0).should('be.empty')
    cy.get('#city').find('option').eq(1).should('have.text', 'Tallinn')
    cy.get('#city').find('option').eq(2).should('have.text', 'Haapsalu')
    cy.get('#city').find('option').eq(3).should('have.text', 'Tartu')

    cy.get('#country').select('Austria')
    cy.get('#city').find('option').eq(0).should('be.empty')
    cy.get('#city').find('option').eq(1).should('have.text', 'Vienna')
    cy.get('#city').find('option').eq(2).should('have.text', 'Salzburg')
    cy.get('#city').find('option').eq(3).should('have.text', 'Innsbruck')
});

it('Radio button is correct', () => {
    // Array of found elements with given selector has 4 elements in total
    cy.get('input[name="freq"]').should('have.length', 4)
    // Verify labels of the radio buttons
    cy.get('input[name="freq"]').next().eq(0).should('have.text','Daily')
    cy.get('input[name="freq"]').next().eq(1).should('have.text','Weekly')
    cy.get('input[name="freq"]').next().eq(2).should('have.text','Monthly')
    cy.get('input[name="freq"]').next().eq(3).should('have.text','Never')
//Verify default state of radio buttons
    cy.get('input[name="freq"]').eq(0).should('not.be.checked')
    cy.get('input[name="freq"]').eq(1).should('not.be.checked')
    cy.get('input[name="freq"]').eq(2).should('not.be.checked')
    cy.get('input[name="freq"]').eq(3).should('not.be.checked')
})

it('Checkboxes are correct', () => {
    // Array of found elements with given selector has 3 elements in total
    cy.get('input[type="checkbox"]').should('have.length', 2)

    // Verify labels of the checkboxes 
    cy.get('input[type="checkbox"]').next().eq(0).should('have.text','')
    cy.get('input[type="checkbox"]').next().eq(1).should('have.text','Accept our cookie policy')

    //Verify default state of check boxes
    cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
    cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')

    // Selecting one will not remove selection from other check box
    cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
    cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')

    //Check link in the second checkbox
    it('Check navigation part - link in second checkbox', () => {
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text', 'Accept our cookie policy')

        cy.get('input[type="checkbox"]').next().eq(1).click()

        cy.url().should('eq', 'http://localhost:54924/cypress/fixtures/cookiePolicy.html')
        cy.get('#successMessage').should('contain', 'This is a demo page, no cookie policies are used for demo')
        cy.go('back')
        cy.log('Back again in registration form 3')
    })

})
it('Email input should support correct pattern', () => {
    // Check regex
    // input invalid email
    // check that tooltip is same as expected
    // submit button should not be active
        cy.get('input[type="email"]').should('have.class', 'email')

        cy.get('input[type="email"]').type('osama@email.com')
        cy.get('#emailAlert').should('not.be.visible')

        cy.get('input[type="email"]').clear()

        cy.get('#emailAlert').should('be.visible').and('contain', 'Email is required.')
        cy.get('input[type="email"]').type('email')

        cy.get('#emailAlert').should('be.visible').and('contain', 'Invalid email address.')
        cy.get('input[type="email"]').type('@email.com')

        cy.get('#emailAlert').should('not.be.visible')
    
    
})




/*
BONUS TASK: add functional tests for registration form 3
Task list:
* Create second test suite for functional tests
* Create tests to verify logic of the page:
    * all fields are filled in + validation
    * only mandatory fields are filled in + validations
    * mandatory fields are absent + validations (try using function)
    * If city is already chosen and country is updated, then city choice should be removed
    * add file (google yourself for solution)
 */

it.only('All fields are filled in', () => {
    cy.get('#name').type('Something')
    cy.get('input[type="email"]').type('biden@email.com')
    cy.get('#country').select('Austria')
    cy.get('#city').select('Salzburg')
    cy.get('input[type="date"]').eq(0).click().type('2002-12-21')
    cy.get('input[type="radio"]').eq(0).check().should('be.checked')
    cy.get('input[type="date"]').eq(1).click().type('2019-12-19')
    cy.get('input[type="checkbox"]').eq(0).click()
    cy.get('input[type="checkbox"]').eq(0).should('be.checked')
    cy.get('input[type="checkbox"]').eq(1).click()
    cy.get('input[type="checkbox"]').eq(1).should('be.checked')
    cy.get('input[type="submit"]').eq(1).should('be.enabled')
    cy.get('input[type="submit"]').eq(1).click()

    cy.get('h1').should('contain', "Submission received")
})    

//Only mandatory fields are filled in
it('Only mandatory fields are filled in', () => {
        cy.get('input[type="email"]').type('biden@email.com')
        cy.get('#country').select('Estonia')
        cy.get('#city').select('Tallinn')
        cy.get('input[type="radio"]').eq(3).check().should('be.checked')
        cy.get('input[type="date"]').eq(1).click().type('2002-12-21')
        cy.get('input[type="checkbox"]').eq(0).click()
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')
        cy.get('input[type="submit"]').eq(1).should('be.enabled')
        cy.get('input[type="submit"]').eq(1).click()
        cy.get('h1').should('contain', "Submission received")
    })


//Mandatory fields are absent
it('Mandatory fields are absent', () => {
    cy.get('input[type="submit"]').eq(1).should('be.disabled')
    cy.get('input[type="email"]').type('biden@email.com')
    cy.get('input[type="submit"]').eq(1).should('be.disabled')
    cy.get('#country').select('Austria')
    cy.get('input[type="submit"]').eq(1).should('be.disabled')
    cy.get('#city').select('Salzburg')
    cy.get('input[type="submit"]').eq(1).should('be.disabled')
    cy.get('input[type="radio"]').eq(3).check().should('be.checked')
    cy.get('input[type="submit"]').eq(1).should('be.disabled')
    cy.get('input[type="date"]').eq(1).click().type('2002-12-21')
    cy.get('input[type="submit"]').eq(1).should('be.disabled')
    cy.get('input[type="checkbox"]').eq(0).click()
    cy.get('input[type="submit"]').eq(1).should('be.enabled')

    cy.get('input[type="email"]').clear()
    cy.get('#emailAlert').should('be.visible').should('contain', 'Email is required')
    cy.get('input[type="submit"]').eq(1).should('be.disabled')
    cy.get('input[type="email"]').type('biden@email.com')
    cy.get('input[type="submit"]').eq(1).should('be.enabled')
    cy.get('input[type="submit"]').eq(1).click()
    cy.get('h1').should('contain', "Submission received")
})


//Changing country
it('Changing country removes previously chosen city', () => {
    cy.get('#name').clear().type('Something')
    cy.get('input[type="email"]').type('biden@email.com')
    cy.get('#country').select('Estonia')
    cy.get('#city').select('Tallinn')
    cy.get('input[type="radio"]').eq(3).check().should('be.checked')
    cy.get('input[type="date"]').eq(1).click().type('2002-12-21')
    cy.get('input[type="checkbox"]').eq(0).click()
    cy.get('input[type="checkbox"]').eq(0).should('be.checked')
    cy.get('#country').select('Austria')
    cy.get('#city').find('option').should('be.empty')
    cy.get('input[type="submit"]').eq(1).should('be.disabled')
    cy.get('#city').select('Salzburg')
    cy.get('input[type="submit"]').eq(1).should('be.enabled')
    cy.get('input[type="submit"]').eq(1).click()
    cy.get('h1').should('contain', "Submission received")
})


//Adding a file
it('User can add a file', () => {
    cy.get('#myFile').click().selectFile('picture.jpeg')
    cy.get('input[type="submit"]').eq(0).should('be.enabled')
    cy.get('input[type="submit"]').eq(0).click()
})

