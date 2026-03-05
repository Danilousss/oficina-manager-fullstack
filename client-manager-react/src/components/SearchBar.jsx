
export default function SearchBar({ 
  searchType, setSearchType, 
  searchTerm, setSearchTerm, 
  handleSearch 
}) {
  return (
    <div className="row mb-3 g-2">  
      <div className="col-md-3">
        <select className="form-select red-of" value={searchType} 
          onChange={(e) => { setSearchType(e.target.value); setSearchTerm(""); }}>
          <option value="name">Nome</option>
          <option value="placa">Placa</option>
          <option value="carro">Carro</option>
          <option value="data">Data</option>
        </select>
      </div>
      <div className="col-md-7">
        {searchType === 'data' ? (
          <input type="date" className="form-control red-of" value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} />
        ) : (
          <input type="text" className="form-control red-of" placeholder="Digite para buscar..." value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} />
        )}
      </div>
      <div className="col-md-2">
        <button className="btn red-of w-100" onClick={handleSearch}>Buscar</button>
      </div>
    </div>
  );
}