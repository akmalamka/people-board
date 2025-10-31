# 👥 PeopleBoard: User Management Application

PeopleBoard is a simple, modern front-end application designed for managing a user directory. It allows users to perform basic CRUD (Create, Read, Update, Delete) operations on a list of user records.

---

## 🚀 Key Technologies

This project is built using a modern React stack for a fast, component-driven experience:

* **Framework:** React (Vite)
* **UI Library:** **Material UI (MUI)** for professional, polished components.
* **Styling:** **Tailwind CSS** for utility-first, rapid styling.
* **State Management:** **React Context** (UserContext, ToastContext) for application-level state.
* **Testing:** **Vitest / React Testing Library** for robust unit and integration tests.
* **API Simulation:** **crudcrud.com** (Temporary Mock API).

---

## 🛠️ Setup and Installation

To get the PeopleBoard application running locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/akmalamka/people-board.git
    cd people-board
    ```

2.  **Install Dependencies:**
    This project uses `pnpm` as the package manager.
    ```bash
    pnpm install
    ```

3.  **Run the Application (Development Mode):**
    ```bash
    pnpm dev
    ```
    The application will typically open at `http://localhost:5173`.

---

## 🧪 Running Tests

To ensure code stability and integrity, run the automated tests:

```bash
pnpm test
```

## ⚠️ Important Note on Mock API (`crudcrud.com`)

This application uses a mock REST API endpoint from `crudcrud.com` for the initial data read operation (`R` in CRUD).

* **API Data Usage:** The application only uses this API to **retrieve the initial list of users**.
* **Data Persistence:** Once the data is loaded, all subsequent state changes (Add, Edit, Delete) are managed locally within **React Context**. These operations **do not sync back** to the external `crudcrud.com` API, as per project requirements.
* **Expiration:** **crucrud.com endpoints are temporary and typically last for 10 days.** If the application fails to load initial data, the API endpoint is likely expired. **If this happens, please let me know so I can update the endpoint in the configuration.**
