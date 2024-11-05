/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.post('/nutzer/anzeigen', async ({ view, request }) => {
    const data = {
        vorname: request.input('vorname'),
        nachname: request.input('nachname')
    }
    console.log(data)
    return view.render('pages/nutzer_anzeigen', data)


})

router.get('/nutzer', async ({ view }) => {
    return view.render('pages/nutzer_form')

})


router.get('/', async ({ view }) => {
    //console.log(await view.render('pages/home'))
    const data = {
        isLoggedIn: false,
        gruss: 'Guten Hase!', wochentag: 'Sonntag', zeit: new Date().toLocaleTimeString(),
        namen: ['Malte', 'Jaqueline', 'Horst'],
        personen: [
            { vorname: 'Maik', nachname: 'Müller' },
            { vorname: 'Sabrina', nachname: 'Sonne' },
            { vorname: 'Manfred', nachname: 'Mond' }
        ]
    }

    return view.render('pages/home', data)
})

router.get('/omm', async () => {
    return 'Hallo OMM!'
})

router.get('/impressum', async ({ view }) => {
    return view.render('pages/impressum')
})


router.get('/data', async (ctx) => {
    return ctx
})

router.get('/wi', async () => {
    return '<html><head></head><body>Hallo WI!</body></html>'
})