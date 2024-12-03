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

router.post('/admin/post/edit', async ({ request, response, session }) => {
    if (session.get('login') === undefined) {
        response.redirect('/admin/login')
    }
    const result = await db.from('posts')
        .where({ id: request.input('id') })
        .update(
            {
                title: request.input('title'),
                teaser: request.input('teaser'),
                text: request.input('text'),
                date: new Date().toLocaleDateString()
            }
        )
    if (!result) {
        return 'Fehler'
    }
    console.log(result)
    return response.redirect('/posts/' + request.input('id'))
})

router.get('/admin/post/edit/:id', async ({ params, view, session, response }) => {
    if (session.get('login') === undefined) {
        response.redirect('/admin/login')
    }
    const post = await db.from('posts')
        .select('*')
        .where({ id: params.id })
        .first()
    return view.render('pages/admin/editpost', post)
})

router.post('admin/login', async ({ session, request, view, response }) => {

    const result = await db.from('users')
        .select('*')
        .where('login', request.input('login'))
        .first()
    if (!result) {
        console.error('Nutzer nicht gefunden')
        return view.render('pages/admin/login', { error: 'Nutzer nicht gefunden' })
    }
    console.log(result)
    const passwordOk = await hash.verify(result.password, request.input('password'))
    if (!passwordOk) {
        return view.render('pages/admin/login', { error: 'Passwort falsch' })
    }
    session.put('login', result.login)
    session.put('firstname', result.firstname)
    session.put('lastname', result.lastname)
    return response.redirect('/')

})

router.get('admin/login', async ({ view }) => {
    return view.render('pages/admin/login')
})

router.get('/admin/logout', async ({ session, response }) => {
    session.clear()
    return response.redirect('/')
})


router.get('/', async ({ view }) => {
    const posts = await db.from('posts')
        .select('*')
        .orderBy('id', 'desc')
    return view.render('pages/home', { posts: posts })
})

router.get('/posts/:id', async ({ view, params }) => {
    const post = await db.from('posts')
        .select('*')
        .where({ id: params.id })
        .first()

    if (!post) {
        return view.render('pages/404')
    }
    const user = await db.from('users')
        .select('*')
        .where({ login: post.author })
        .first()
    console.log(post)
    post.firstname = user.firstname
    post.lastname = user.lastname
    return view.render('pages/posts', post)
    // {post:post, firstname: user.firstname, lastname:user.lastname}
    // post.title   firstname
})

router.get('/admin/post/create', async ({ view, session, response }) => {
    if (session.get('login') === undefined) {
        response.redirect('/admin/login')
    }
    return view.render('pages/admin/createpost')
})

router.post('/admin/post/create', async ({ request, response, session }) => {
    if (session.get('login') === undefined) {
        response.redirect('/admin/login')
    }
    try {
        const result = await db.table('posts').insert(
            {
                title: request.input('title'),
                teaser: request.input('teaser'),
                text: request.input('teaser'),
                author: session.get('login'),
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