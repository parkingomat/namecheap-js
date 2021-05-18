const users = [
    { id: 1, name: 'Marcus' },
    { id: 2, name: 'Norman' },
    { id: 3, name: 'Christian' }
]

const containsMarcus = !!users.find(user => {
    return user.name === 'Marcus'
})
// true


const names = ['Marcus', 'Norman', 'Christian']

const containsMarcus = names.includes('Marcus')
// true

const containsMarcus = names.includes('Future Studio')
// false