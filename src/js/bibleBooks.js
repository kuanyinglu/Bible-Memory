import { processFetchedVerses, updateVerses, startTyper } from './redux/actions';
import store from "./redux/store";

const booksData = [{ id: 0, title: "The Old Testament", content: "Genesis, Exodus, Leviticus, Numbers, Deuteronomy, Joshua, Judges, Ruth, 1 Samuel, 2 Samuel, 1 Kings, 2 Kings, 1 Chronicles, 2 Chronicles, Ezra, Nehemiah, Esther, Job, Psalms, Proverbs, Ecclesiastes, Song of Solomon, Isaiah, Jeremiah, Lamentations, Ezekiel, Daniel, Hosea, Joel, Amos, Obadiah, Jonah, Micah, Nahum, Habakkuk, Zephaniah, Haggai, Zechariah, Malachi" }, { id: 1, title: "The New Testament", content: "Matthew, Mark, Luke, John, Acts, Romans, 1 Corinthians, 2 Corinthians, Galatians, Ephesians, Philippians, Colossians, 1 Thessalonians, 2 Thessalonians, 1 Timothy, 2 Timothy, Titus, Philemon, Hebrews, James, 1 Peter, 2 Peter, 1 John, 2 John, 3 John, Jude, Revelation" }];

export const practiceBooks = () => {
  store.dispatch(processFetchedVerses(booksData, "Books of The Bible"));
  store.dispatch(updateVerses("Books of The Bible"));
  store.dispatch(startTyper(booksData));
};