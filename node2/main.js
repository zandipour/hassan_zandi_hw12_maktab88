$(function () {
  let page = 1;
  let totalPages;
  let perPage;
  let defaultUsers = [];
  let presentedUser = [];
  let users = [];
  let searchValue;

  const cardsContainer = $("#cardsContainer");
  const paginationContent = $("#paginationContent");

  const cardGenerator = (user) => {
    return `
    <div class="col-md-4 col-sm-6 col-12">
      <div class="card shadow p-3">
        <img src="${user.avatar}" class="card-img-top rounded" />
        <div class="card-body px-0">
          <h5 class="card-title">${user.first_name} ${user.last_name}</h5>
          <p class="card-text">
            <p>UID: ${user.id}</p>
            <p>Email: ${user.email}</p>
          </p>
          <a href="./profile.html?id=${user.id}" class="btn btn-primary w-100">Show Profile</a>
        </div>
      </div>
    </div>
    `;
  };

  const cardsRenderer = () => {
    let html = "";
    for (const user of users) {
      if (removedUsers.includes(String(user.id))) continue;
      html += cardGenerator(user);
    }
    if (!!createdUsers && createdUsers.length !== 0) {
      for (const user of createdUsers) {
        const targetUser = presentedUser.find(
          (el) => el[0] === String(user.id) && el[1] !== page
        );
        if (!!targetUser) continue;
        html += cardGenerator(user);
        presentedUser.push([String(user.id), page]);
      }
    }
    cardsContainer.html(html);
  };

  this.handleOnClickNewPage = (newPage) => {
    page = newPage;
    requestHandler(newPage);
  };
  const paginationContentButtons = () => {
    let html = "";
    for (let index = 1; index <= totalPages; index++) {
      html += `<li onclick="handleOnClickNewPage(${index})" class="page-item ${
        index == page ? "active" : ""
      }">
          <a class="page-link">${index}</a>
      </li>`;
    }
    return html;
  };

  const paginationContentRenderer = () => {
    paginationContent.html(
      `<li class="page-item">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
        </li>
        ${paginationContentButtons()}
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>`
    );
  };

  $("#searchForm").on("submit", function (e) {
    e.preventDefault();
    searchValue = $("#searchInput").val().toLowerCase();
    if (!!searchValue?.trim()) {
      users = defaultUsers.filter(
        (el) =>
          el.first_name.toLowerCase().includes(searchValue) ||
          el.last_name.toLowerCase().includes(searchValue) ||
          el.email.toLowerCase().includes(searchValue)
      );
    } else {
      users = [...defaultUsers];
    }
    cardsRenderer();
  });

  const requestHandler = (page) => {
    $.ajax({
      type: "GET",
      url: `https://reqres.in/api/users?page=${page}`,
      success: function (response) {
        totalPages = response.total_pages;
        perPage = response.per_page;
        users = [...response.data];
        defaultUsers = [...response.data];
        cardsRenderer();
        paginationContentRenderer();
      },
      error: function (err) {
        console.log(err);
        alert("Something went wrong.");
      },
    });
  };

  requestHandler(page);
})