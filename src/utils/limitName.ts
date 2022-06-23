const limitName = (name:string) => name.length > 20  ? `${name.slice(0,20)}...` : name; 

export default limitName;