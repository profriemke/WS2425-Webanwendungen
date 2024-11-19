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

router.get('/', async ({ view }) => {
    const posts = await db.from('posts')
                          .select('*')
                          .orderBy('id', 'desc')
    return view.render('pages/home', { posts: posts })
})

router.get('/posts/:id', async ({view, params })=>{
    const post = await db.from('posts')
                         .select('*')
                         .where({id: params.id })
                         .first()
    console.log(post)
    return view.render('pages/posts', post)
})

router.get('/admin/post/create', async({ view })=>{
    return view.render('pages/admin/createpost')
})

router.post('/admin/post/create', async ({ request, response })=>{
    try{
        const result = await db.table('posts').insert(
            {
                title: request.input('title'),
                teaser: request.input('teaser'),
                text: request.input('teaser'),
                author: request.input('author'),
                date: new Date().toLocaleDateString()
            }
        )
        if(!result){
            return 'Fehler!'
        }
    }catch(error){
        return 'Fehler beim Eintragen'
    }
    return response.redirect('/')
})


router.get('/a', async ({ session }) => {
    session.put('text', 'Riemke war da')
    return 'Wert gesetzt';
  });
  
  router.get('/b', async ({ session }) => {
    return session.get('text');
  });