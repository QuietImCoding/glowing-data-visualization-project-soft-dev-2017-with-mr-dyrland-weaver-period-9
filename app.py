from flask import Flask, render_template
app = Flask(__name__)

@app.route("/")
def home():
    return render_template("pichart.html")

@app.route("/example")
def test():
    return render_template("example.html")

if __name__ == "__main__":
    app.debug = True
    app.run()

