import Eight from 'components/Functions';

describe("Basic Functions", ()=>{
  it("should have shuffle function", ()=>{
    let arr = [1, 2, 3, 4, 5];
    Eight.shuffleArr(arr).should.not.equal(arr);
  });
  it("should have getInversionNumber function", ()=>{
    let arr1 = [3, 4, 2, 1, 6, 5]; // 2+2+1+0+1
    let arr2 = [3, 4, 2, 1, 5, 6]; // 2+2+1+0+0
    Eight.getInversionNumber(arr1).should.equal(6);
    Eight.getInversionNumber(arr2).should.equal(5);
    Eight.getInversionNumber(arr1, true).should.equal(true);
    Eight.getInversionNumber(arr2, true).should.equal(false);
  });
  it("should have getFxOfState function", ()=>{
    let eState = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    let nState = [1, 3, 2, 4, 5, 6, 0, 7, 8];
  });
});
