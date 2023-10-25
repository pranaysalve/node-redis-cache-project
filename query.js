const query = Person.find({ occupation: /host/ })
  .where("name.last")
  .equals("Ghost")
  .where("age")
  .gt(17)
  .lt(66)
  .where("likes")
  .in(["vaporising", "talking"])
  .limit(10)
  .sort("-occupation")
  .select("name occupation");

query.getOptions();
