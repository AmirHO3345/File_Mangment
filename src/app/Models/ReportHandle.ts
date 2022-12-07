
export class Report {

  private readonly ColumnNames : string[] ;

  private readonly RowsValue : string[][] ;

  constructor() {
    this.ColumnNames = [] ;
    this.RowsValue = [] ;
  }

  SetName(Name : string) {
    this.ColumnNames.push(Name) ;
  }

  SetNames(Names : string[]) {
    this.ColumnNames.push(...Names) ;
  }

  SetValue(Value : string[]) {
    this.RowsValue.push(Value) ;
  }

  SetValues(Values : string[][]) {
    Values.forEach(Value =>
      this.SetValue(Value))
  }

  GetNames() {
    return this.ColumnNames.slice() ;
  }

  GetValue() {
    return this.RowsValue.slice() ;
  }

}
