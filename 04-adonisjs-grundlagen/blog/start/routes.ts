/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import db from '@adonisjs/lucid/services/db'
import hash from '@adonisjs/core/services/hash'

router.post('admin/login', async ({ session, request, response })=>{ if(session.get('login') === undefined){
    response.redirect('/admin/login')
}
    const result = await db.from('users')
                           .select('*')
                           .where('login', request.input('login'))
                           .first()
    if(!result){
        console.log('Nutzer nicht gefunden')
        return response.redirect('/admin/login')
    }    
    console.log(result) 
    const passwordOk = await hash.verify(result.password, request.input('password'))     
    if(!passwordOk){
        return response.redirect('/admin/login')
    }    
    session.put('login', result.login)
    session.put('firstname', result.firstname)
    session.put('lastname', result.lastname)
    return response.redirect('/')         
   
})

router.get('admin/login', async ({ view })=>{
    return view.render('pages/admin/login')
})
router.get('/admin/logout', async ({ session, response })=>{
    session.clear()
    return response.redirect('/')
})


router.get('/', async ({ view, session }) => {
    const posts = await db.from('posts')
        .select('*')
        .orderBy('id', 'desc')
    return view.render('pages/home', { posts: posts, firstname: session.get('firstname') })
})

router.get('/posts/:id', async ({ view, params }) => {
    const post = await db.from('posts')
        .select('*')
        .where({ id: params.id })
        .first()
    console.log(post)
    return view.render('pages/posts', post)
})

router.get('/admin/post/create', async ({ view, session, response }) => {
    if(session.get('login') === undefined){
        response.redirect('/admin/login')
    }
    return view.render('pages/admin/createpost')
})

router.post('/admin/post/create', async ({ request, response }) => {
    try {
        const result = await db.table('posts').insert(
            {
                title: request.input('title'),
                teaser: request.input('teaser'),
                text: request.input('teaser'),
                author: request.input('author'),
                date: new Date().toLocaleDateString()
            }
        )
        if (!result) {
            return 'Fehler!'
        }
    } catch (error) {
        return 'Fehler beim Eintragen'
    }
    return response.redirect('/')
})


router.get('/cookiedemo/a', async ({ session }) => {
    session.put('text', 'Riemke war da')
    return 'Wert gesetzt';
});

router.get('/cookiedemo/b', async ({ session }) => {
    return session.get('text');
});
router.get('/cookiedemo/c', async ({ session }) => {
    session.forget('text')
    return 'text gelöscht'
});

router.get('/hash', async () => {
    const hashedPw = await hash.make('123')
    console.log(hashedPw)
    return await hash.verify(hashedPw, '123')
});