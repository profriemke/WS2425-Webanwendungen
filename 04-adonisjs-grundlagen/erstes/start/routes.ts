/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/', async ({ view}) =>{

    return view.render('pages/home')
})

router.get('/omm', async () =>{
    return 'Hallo OMM!'
})

router.get('/data', async (ctx) => {
    return ctx
})