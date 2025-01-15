 import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import { cuid } from '@adonisjs/core/helpers'

export default class PostsController {
    public async create({ request, response, session }:HttpContext) {
        if (session.get('login') === undefined) {
            response.redirect('/admin/login')
        }
        const image = request.file('image', {size:'10mb', extnames:['jpg','png']})
        if(!image?.isValid){
            return image?.errors
        }
        const key = `uploads/${cuid()}.${image.extname}`
        try {
        await image.moveToDisk(key, 'fs')
        }
        catch(e){
            console.log(e)
        }
        try {
            const result = await db.table('posts').insert(
                {
                    title: request.input('title'),
                    teaser: request.input('teaser'),
                    text: request.input('teaser'),
                    author: session.get('login'),
                    date: new Date().toLocaleDateString(),
                    key:key
                }
            )
            if (!result) {
                return 'Fehler!'
            }
        } catch (error) {
            return 'Fehler beim Eintragen'
        }
        return response.redirect('/')
    }




    public async home({ view }:HttpContext){
       const posts = await db.from('posts')
        .select('*')
   
        .orderBy('id', 'desc')
    return view.render('pages/home', { posts: posts })
}
public async edit({ request, response, session }:HttpContext) {
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
}

}