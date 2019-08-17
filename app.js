const express = require("express");
const app = express();
const port = 3000;
app.use(express.json())
class Pokemons
{
        constructor(name,type)
        {
        this.id = null
        this.name = name
        this.type = type
        this.type2 = null
        }

}
function generateId()
{
    let NewId = pokemons.length+1
    return NewId
}
function createPokemon(name,type)
{
    let p = new Pokemons(name,type)
    p.id = generateId()
    return p
}
function isSufficientParameter(v){
    return v !== undefined || v !== null || v !== ''
}
function isProkemonExited(id){
    let p = pokemons[id-1]
    if(p=== undefined||p===null){
        res.status(400).send({
            error: 'Cannot update pokemon: Pokemon is not found'
        })
    }
}
let pokemons = []
    pokemons.push(createPokemon('Praduk','Fish')),
    pokemons.push(createPokemon('Prawit','Clock'))

app.get("/pokemons", (req, res) => res.send(pokemons))
app.post("/pokemons", (req, res) => {
    if(isSufficientParameter(req.body.name) || isSufficientParameter(req.body.type))
    {    
        res.status(400).send('Insufficient parameters: name and type are required parameter')
        return
    }
    let p = new Pokemons(req.body.name , req.body.type)
    p.id = generateId()
    console.log(req.body)
    pokemons.push(p)
    res.sendStatus(201)
})
//get http://localhost:3000/pokemons/1
app.get('/pokemons/:id',(req,res)=> {
    let id = req.params.id
    let p = pokemons[id-1]
    res.send(p)
})
app.put('/pokemons:id',(req,res)=>{
    if(!isSufficientParameter(req.body.type2)){
        res.status(400).send({ error: 'Insufficient parameters: type2 is required parameter'})
        return
    }
    if(!isSufficientParameter(req.params.id)){
        res.status(400).send({ error: 'Insufficient parameters: id is required parameter'})
        return
    }
    let id = req.params.id
    let p = pokemons[id-1]
    if(p=== undefined){
        res.status(400).send({
            error: 'Cannot update pokemon: Pokemon is not found'
        })
    }
    p.type2 = req.body.type2
    res.sendStatus(201)
})
app.put('/pokemons:id',(req,res)=>{
    if(!isSufficientParameter(req.body.type2)){
        res.status(400).send({ error: 'Insufficient parameters: type2 is required parameter'})
        return
    }
    if(!isSufficientParameter(req.params.id)){
        res.status(400).send({ error: 'Insufficient parameters: id is required parameter'})
        return
    }
    let id =req.param.id
    let p =pokemons[id-1]
    if(p=== undefined){
        res.status(400).send({
            error: 'Cannot update pokemon: Pokemon is not found'
        })
    }

})
app.delete('/pokemons:id',(req,res)=>{
    if(!isSufficientParameter(req.body.type2)){
        res.status(400).send({ error: 'Insufficient parameters: type2 is required parameter'})
        return
    }
    let id =req.params.id
    let p =pokemons[id-1]
    if(!isProkemonExited(req.params.id)){
        res.status(400).send({ error: 'Cannt delte pokemon: Pokemon is not found'})
        return
    }
    delete pokemons[id-1]
    res.sendStatus

})
function genNewId(num){
    let newId = num+1
    return newid
}
app.listen(port, () => console.log(`Pokemon!! API listening on port ${port}!`))