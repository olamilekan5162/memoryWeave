const DB_NAME = "SummerVibeDB";
const STORE_NAME = "userVibes";
const DB_VERSION = 1;

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Failed to open DB");
  });
}

export async function saveVibe(vibe) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const request = store.put(vibe);

    request.onsuccess = () => {
      alert("Memory weaved successfully");
      db.close();
      resolve();
    };
    request.onerror = () => {
      console.error("Error saving vibe");
      alert("Failed to weave memory, try again")
      db.close();
      reject("Failed to Weave Memory");
    };
  });
}

export async function getAllVibes() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => {
      db.close();
      resolve(request.result);
    };
    request.onerror = () => {
      db.close();
      reject("Failed to get vibes");
    };
  });
}

export async function getVibeById(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.get(id);

    request.onsuccess = () => {
      db.close();
      resolve(request.result);
    };
    request.onerror = () => {
      db.close();
      reject("Failed to get vibe");
    };
  });
}

export async function deleteVibe(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const request = store.delete(id);

    request.onsuccess = () => {
      alert("Weave deleted successfully")
      db.close();
      resolve();
    };
    request.onerror = () => {
      alert("Failed delete Weave, try again")
      db.close();
      reject("Failed to delete vibe");
    };
  });
}

export const importVibe = async (jsonString) => {
  const capsule = JSON.parse(jsonString);

  const mediaWithFiles = await Promise.all(
    capsule.media.map(async (item) => {
      const file = base64ToFile(item.file, item.name, item.type);
      return {
        ...item,
        file,
      };
    })
  );

  const reconstructedCapsule = {
    ...capsule,
    media: mediaWithFiles,
  };

  await saveVibe(reconstructedCapsule);
  return true;
};

const base64ToFile = (base64String, filename, mimeType) => {
  const arr = base64String.split(",");
  const mime = mimeType || arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};


export const exportVibe = async (capsule) => {

  if (!capsule) throw new Error("Capsule not found");
  
  const mediaWithBase64 = await Promise.all(
    capsule.media.map(async (item) => {
      const base64 = await fileToBase64(item.file);
      return {
        ...item,
        file: base64, // base64 string
      };
    })
  );

  const capsuleJSON = {
    ...capsule,
    media: mediaWithBase64,
  };

  return JSON.stringify(capsuleJSON);
};

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

