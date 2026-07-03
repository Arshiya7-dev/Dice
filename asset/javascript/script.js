const row = document.querySelector('.row')
const h2 = document.querySelectorAll('h2')
const btn = document.querySelectorAll('button')
const diceEls = document.querySelectorAll('.dice')
let user1 = 0
let user2 = 0
// function myDice() {
//     return (parseInt(Math.random() * 6)) + 1
// }
const myDice = () => Number((parseInt(Math.random() * 6)) + 1)

// --- 3D dice rotation helpers ---
// faces were built as: front=1, top=2, right=3, left=4, bottom=5, back=6
const rotState = [{ x: 0, y: 0 }, { x: 0, y: 0 }]
const faceAngles = {
  1: { x: 0, y: 0 },
  2: { x: -90, y: 0 },
  3: { x: 0, y: -90 },
  4: { x: 0, y: 90 },
  5: { x: 90, y: 0 },
  6: { x: 0, y: 180 }
}
function startDiceSpin(index) {
  const el = diceEls[index]
  el.style.transition = 'none'
  el.style.animation = 'fastspin .4s linear infinite'
}
function landDiceOn(index, value) {
  const el = diceEls[index]
  const target = faceAngles[value]
  const spins = 3 + Math.floor(Math.random() * 2) // a couple of extra full turns for flair
  const baseX = Math.floor(rotState[index].x / 360) + spins
  const baseY = Math.floor(rotState[index].y / 360) + spins
  rotState[index].x = baseX * 360 + target.x
  rotState[index].y = baseY * 360 + target.y

  // stop the tumbling keyframe animation...
  el.style.animation = 'none'
  el.style.transition = 'none'
  void el.offsetWidth // force a reflow so the browser "locks in" the frozen frame above
  // ...then ease smoothly into the landed face, so the stop reads as a real motion, not a snap
  el.style.transition = 'transform .6s cubic-bezier(.16,.84,.44,1)'
  el.style.transform = `rotateX(${rotState[index].x}deg) rotateY(${rotState[index].y}deg)`
}
// --- 3D dice rotation helpers ---

// onload recognize to turn//
let turn = parseInt(Math.random() * 2)
if (turn) {
  btn[1].setAttribute('disabled', 'disabled')
} else {
  btn[0].setAttribute('disabled', 'disabled')
}
// onload recognize to turn//

// click and cala them//
function roll(user) {
  if (user == 'user1') {
    startDiceSpin(0)
    setTimeout(() => {
      // console.log(myDice());
      let temp = myDice()
      landDiceOn(0, temp)
      if (temp != 6) {
        btn[0].setAttribute('disabled', 'disabled')
        btn[1].removeAttribute('disabled')
      }
      btn[0].innerText = 'roll '
      // user1 = user1 + temp
      user1 += temp
      h2[0].innerText = user1

      if (user1 >= 30) {
        alert('user1 won!')
        // location.reload
        row.setAttribute('inert', 'inert')
      }
    }, 1000);

  } else {
    // user2//
    startDiceSpin(1)
    setTimeout(() => {
      // console.log(myDice());
      let temp = myDice()
      landDiceOn(1, temp)
      if (temp != 6) {
        btn[1].setAttribute('disabled', 'disabled')
        btn[0].removeAttribute('disabled')
      }
      btn[1].innerText = 'roll '
      // user2 = user2 + temp
      user2 += temp
      h2[1].innerText = user2

      if (user2 >= 30) {
        alert('user2 won!')
        // location.reload
        row.setAttribute('inert', 'inert')
      }
    }, 1000);
  }
}
// click and cala them//