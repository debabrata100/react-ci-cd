function Game() {
  const deleteBox = (event) => {
    const box = event.target;
    box.remove();
  };

  const boxes = Array.from({ length: 9 }, (_, index) => (
    <div key={index} className="box" onClick={deleteBox}>
      {index + 1}
    </div>
  ));
  const addNewBox = () => {
    const newBox = document.createElement("div");
    newBox.className = "box";
    newBox.textContent = document.querySelectorAll(".box").length + 1;
    newBox.addEventListener("click", deleteBox);
    document.querySelector(".boxes").appendChild(newBox);
  };
  return (
    <div className="game">
      <h1>Box Game</h1>
      <div className="game-content">
        <div className="boxes">{boxes}</div>
        <div className="game-info">
          <button className="add-box-btn" onClick={addNewBox}>
            Add Box
          </button>
        </div>
      </div>
    </div>
  );
}

export default Game;
