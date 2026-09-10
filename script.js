const container = document.querySelector(".box");
const cubes = document.querySelectorAll(".cube");

let selectedCube = null;
let offsetX = 0;
let offsetY = 0;

cubes.forEach(cube => {

    cube.addEventListener("mousedown", function (e) {
        selectedCube = cube;

        const rect = cube.getBoundingClientRect();

        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        cube.style.position = "absolute";
        cube.style.zIndex = "1000";

        e.preventDefault();
    });

});

document.addEventListener("mousemove", function (e) {

    if (!selectedCube) return;

    const containerRect = container.getBoundingClientRect();
    const cubeRect = selectedCube.getBoundingClientRect();

    let newLeft = e.clientX - containerRect.left - offsetX;
    let newTop = e.clientY - containerRect.top - offsetY;

    // Keep cube inside the defined area
    const maxLeft = container.clientWidth - cubeRect.width;
    const maxTop = container.clientHeight - cubeRect.height;

    newLeft = Math.max(0, Math.min(newLeft, maxLeft));
    newTop = Math.max(0, Math.min(newTop, maxTop));

    selectedCube.style.left = newLeft + "px";
    selectedCube.style.top = newTop + "px";
});

document.addEventListener("mouseup", function () {

    if (selectedCube) {
        selectedCube.style.zIndex = "1";
    }

    selectedCube = null;
});