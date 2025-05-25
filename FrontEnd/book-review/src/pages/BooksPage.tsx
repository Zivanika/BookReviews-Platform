import React, { useContext, useEffect, useState } from "react";
import {
  Filter,
  Search,
  X,
  Book,
  ChevronLeft,
  ChevronRight,
  Loader,
} from "lucide-react";
import BookContext from "../context/BookContext";
import { Link, useSearchParams } from "react-router-dom";

const genres = [
  "All",
  "Fiction",
  "Non-Fiction",
  "Mystery",
  "Sci-Fi",
  "Fantasy",
  "Romance",
  "Thriller",
  "Biography",
  "History",
  "Self-Help",
];

// Mock book data for demonstration
const mockBooks = [
  {
    _id: "1",
    title: "The Great Adventure",
    author: "John Smith",
    genre: "Fiction",
    cover: "https://picsum.photos/200/300?random=1",
    rating: 4.5,
  },
  {
    _id: "2",
    title: "Mystery of the Ancient Castle",
    author: "Jane Doe",
    genre: "Mystery",
    cover: "https://picsum.photos/200/300?random=2",
    rating: 4.2,
  },
  {
    _id: "3",
    title: "Space Odyssey",
    author: "Mike Johnson",
    genre: "Sci-Fi",
    cover: "https://picsum.photos/200/300?random=3",
    rating: 4.8,
  },
  {
    _id: "4",
    title: "Dragon's Tale",
    author: "Sarah Wilson",
    genre: "Fantasy",
    cover: "https://picsum.photos/200/300?random=4",
    rating: 4.6,
  },
  {
    _id: "5",
    title: "Love in Paris",
    author: "Emily Brown",
    genre: "Romance",
    cover: "https://picsum.photos/200/300?random=5",
    rating: 4.3,
  },
  {
    _id: "6",
    title: "The Thriller Night",
    author: "David Lee",
    genre: "Thriller",
    cover: "https://picsum.photos/200/300?random=6",
    rating: 4.7,
  },
];

const BookCard = ({ book }: any) => (
  <Link to={`/books/${book._id}`} className="group">
    <div className="group relative bg-gradient-to-br from-amber-50 to-yellow-100 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-amber-200 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-100/20 to-amber-200/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative p-4">
        {book.coverImage ? (
          <div className="h-64 overflow-hidden">
            <img
              src={book.coverImage}
              alt={`${book.title} cover`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="aspect-[3/4] bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg mb-4 flex items-center justify-center border border-amber-300 shadow-inner">
            <Book className="h-12 w-12 text-amber-600" />
          </div>
        )}
        <h3 className="font-bold text-amber-900 text-lg mb-2 group-hover:text-amber-700 transition-colors line-clamp-2">
          {book.title}
        </h3>
        <p className="text-amber-700 text-sm mb-2">by {book.author}</p>
        <div className="flex justify-between items-center">
          <span className="px-2 py-1 bg-amber-200 text-amber-800 text-xs rounded-full font-medium border border-amber-300">
            {book.genre}
          </span>
          <div className="flex items-center text-amber-600">
            <span className="text-sm font-semibold mr-1">★</span>
            <span className="text-sm">{book.rating}</span>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

const VintageWoodBooksPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  // const [loading, setLoading] = useState(false);
  // const [books, setBooks] = useState(mockBooks);
  const { books, loading, getBooks } = useContext(BookContext);

  useEffect(() => {
    const genre = selectedGenre === "All" ? "" : selectedGenre;
    getBooks(currentPage, 12, searchTerm, genre);

    // Update URL params
    const params: { [key: string]: string } = {};
    if (searchTerm) params.search = searchTerm;
    if (selectedGenre !== "All") params.genre = selectedGenre;
    if (currentPage > 1) params.page = currentPage.toString();
    setSearchParams(params);
  }, [searchTerm, selectedGenre, currentPage]);

  const handleSearch = (e: any) => {
    e.preventDefault();
    setCurrentPage(1);
    // Simulate search functionality
    // setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    // }, 500);
  };

  const handleGenreChange = (genre: any) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
    setShowFilters(false);
    // Filter books by genre
    // if (genre === "All") {
    //   setBooks(mockBooks);
    // } else {
    //   setBooks(mockBooks.filter((book) => book.genre === genre));
    // }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedGenre("All");
    setCurrentPage(1);
    // setBooks(mockBooks);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      {/* Vintage Wood Texture Overlay */}
      <div
        className="absolute inset-0 opacity-10 bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d97706' fill-opacity='0.3'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='53' cy='53' r='1'/%3E%3Ccircle cx='13' cy='43' r='1'/%3E%3Ccircle cx='47' cy='17' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="relative container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="mb-6 md:mb-0">
            <h1
              className="text-4xl font-bold text-amber-900 mb-2"
              style={{ fontFamily: '"Cutive Mono", monospace' }}
            >
              Browse Books
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-full"></div>
          </div>

          <div className="w-full md:w-auto md:max-w-md">
            <div className="flex shadow-lg">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search books..."
                  className="w-full py-3 px-4 pr-12 border-2 border-amber-300 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white/90 text-amber-900 placeholder-amber-600"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch(e)}
                />
                <Search className="absolute right-3 top-3.5 h-5 w-5 text-amber-600" />
              </div>
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 border-2 border-amber-300 border-l-0 px-4 rounded-r-xl transition-all duration-200 flex items-center shadow-md hover:shadow-lg"
              >
                <Filter className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div
          className={`bg-gradient-to-r from-amber-100 via-yellow-100 to-amber-100 rounded-xl shadow-lg border-2 border-amber-200 p-6 mb-8 transition-all duration-300 ${
            showFilters ? "block" : "hidden md:block"
          }`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2
              className="text-xl font-bold text-amber-900 flex items-center"
              style={{ fontFamily: '"Cutive Mono", monospace' }}
            >
              <Filter className="mr-2 h-5 w-5" />
              Filters
            </h2>
            {(searchTerm || selectedGenre !== "All") && (
              <button
                onClick={clearFilters}
                className="text-sm text-amber-700 hover:text-amber-900 flex items-center bg-amber-200 hover:bg-amber-300 px-3 py-1 rounded-full transition-colors duration-200 border border-amber-300"
              >
                <X className="h-4 w-4 mr-1" />
                Clear filters
              </button>
            )}
          </div>

          <div>
            <h3 className="text-sm font-bold text-amber-800 mb-3 uppercase tracking-wide">
              Genre
            </h3>
            <div className="flex flex-wrap gap-3">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => handleGenreChange(genre)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border-2 ${
                    selectedGenre === genre
                      ? "bg-gradient-to-r from-amber-600 to-yellow-600 text-white border-amber-600 shadow-lg transform scale-105"
                      : "bg-white/80 text-amber-800 border-amber-300 hover:bg-amber-200 hover:border-amber-400 hover:shadow-md"
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Book Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader className="h-10 w-10 text-amber-600 animate-spin" />
          </div>
        ) : books.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-xl border-2 border-amber-200 shadow-lg">
            <div className="mb-6">
              <Book className="h-16 w-16 text-amber-400 mx-auto mb-4" />
              <p className="text-amber-800 text-xl font-semibold mb-2">
                No books found matching your criteria
              </p>
              <p className="text-amber-600">
                Try adjusting your search or filters
              </p>
            </div>
            <button
              onClick={clearFilters}
              className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-medium px-6 py-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Clear filters and try again
            </button>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <nav className="flex items-center space-x-2 bg-gradient-to-r from-amber-100 to-yellow-100 p-4 rounded-xl shadow-lg border-2 border-amber-200">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                currentPage === 1
                  ? "bg-amber-200 text-amber-400 cursor-not-allowed"
                  : "bg-white text-amber-700 hover:bg-amber-200 hover:text-amber-800 shadow-md hover:shadow-lg"
              }`}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </button>

            {[...Array(5)].map((_, i) => {
              const page = currentPage - 2 + i;
              if (page < 1) return null;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    currentPage === page
                      ? "bg-gradient-to-r from-amber-600 to-yellow-600 text-white shadow-lg transform scale-105"
                      : "bg-white text-amber-700 hover:bg-amber-200 hover:text-amber-800 shadow-md hover:shadow-lg"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="flex items-center px-4 py-2 rounded-lg font-medium bg-white text-amber-700 hover:bg-amber-200 hover:text-amber-800 shadow-md hover:shadow-lg transition-all duration-200"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default VintageWoodBooksPage;
