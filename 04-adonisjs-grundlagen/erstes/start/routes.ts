/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

let counter = 0

let votes = {
    spitze: 0,
    gehtso: 0,
    keinesfalls: 0
}

router.get('/vote/view', async ({ view })=>{
    return view.render('pages/vote/view', votes)

})

router.post('/vote/count', async ({ view, request })=>{
    console.log(request.input('vote'))
    if(request.input('vote') == "gehtso"){
        votes.gehtso++
    }
    if(request.input('vote') == "spitze" ){
        votes.spitze++
    }
    if(request.input('vote') == "keinesfalls"){
        votes.keinesfalls++
    }
    console.log(votes)
    return view.render('pages/vote/danke')

})

router.get('/vote', async ({ view })=>{
    return view.render('pages/vote/form')
})


router.get('/counter', async ({ view }) => {
    counter++  //counter = counter +1
    return view.render('pages/counter', { counter: counter })
})

router.post('/nutzer/anzeigen', async ({ view, request }) => {
    if (!request.input('vorname')) {
        return 'Fehler'
    }
    const data = {
        vorname: request.input('vorname'),
        nachname: request.input('nachname')
    }
    console.log(data)
    return view.render('pages/nutzer_anzeigen', data)
    // return view.render('pages/nutzer_anzeigen', {vorname:'Horst', nachname:'Meier'})
    // let vorname='Horst'
    //return view.render('pages/nutzer_anzeigen', { vorname: vorname })
    //return view.render('pages/nutzer_anzeigen', { vorname })
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