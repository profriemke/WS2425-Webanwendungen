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
import drive from '@adonisjs/drive/services/main'
import hash from '@adonisjs/core/services/hash'
import { cuid } from '@adonisjs/core/helpers'
const PostsController = ()=> import('#controllers/posts_controller')

router.get('/', [PostsController, 'home'])
router.post('/admin/post/edit', [PostsController, 'edit'])
router.post('/admin/post/create', [PostsController, 'create'] )


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



// Demos

router.get('/uploaddemo', async ({view})=>{
    return view.render('pages/uploaddemoform')
})
router.post('/uploaddemo', async({request,response})=>{
    const image = request.file('demofile', {size:'10mb', extnames:['jpg','png']})
    if(!image?.isValid){
        return 'Fehler '+image?.errors
    }
    const key = `uploads/${cuid()}.${image.extname}`
    await image.moveToDisk(key, 'fs')
    return { message: 'hochgeladen', url: await drive.use('fs').getUrl(key)}
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